import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { SearchResponse } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setQuery, setResults } from "../store/searchSlice";
import { Clock } from "lucide-react";

const apiKey = import.meta.env.VITE_API_URL

const Search = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [searchUrl, setSearchUrl] = useState("")
    const {data, isLoading, error} = useFetch<SearchResponse>(searchUrl)

    const {query, results, totalResults} = useSelector((state: RootState)=> state.search)
    const recentMovies = useSelector((state: RootState)=> state.recent.movies)

    
    useEffect(()=>{
        if(data?.Response === "True"){
            dispatch(setResults({results: data.Search, total:data.totalResults}))
        }
    },[data, dispatch])


    const handleSubmit= (e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        if(!query.trim())return
        setSearchUrl(`https://www.omdbapi.com/?s=${encodeURI(query)}&apikey=${apiKey}`)
    }

    
    return (
        <div className="container mx-auto w-11/12 flex flex-col items-center p-8">
            <h1 className="text-3xl font-bold">Search Movies</h1>
            <form className="flex items-center">
                <input type="text" value={query} onChange={(e)=> dispatch(setQuery(e.target.value))} placeholder="Search a movie..." className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button onClick={(e)=>handleSubmit(e)} className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">{isLoading? "Searching...": "Search"}</button>
            </form>
            {error && <p className="text-red-400">Error: {error.message}</p>}
            {/* this is specific for omdbapi site which return .Response === "False" when the fetch goes well but the needed movie isn't found in their db */}
            {data?.Response=== "False" && <p className="text-red-400">{data.Error}</p>}
            
            {!searchUrl && !isLoading && (
                <div className="text-center mt-8">
                    <p className="text-xl">Discover your next favorite movie</p>
                    <p className="text-gray-500">Start by searching for a title above</p>
                </div>
            )}

            {recentMovies.length > 0 && results.length === 0 && (
                <div className="w-full mt-8">
                    <h2 className="text-xl font-bold mb-4">
                        <Clock size={22}/>
                        Recently Viewed
                    </h2>
                    <div className="flex gap-4 overflow-x-auto">
                        {recentMovies.map(movie=>(
                            <div key={movie.imdbID} onClick={()=> navigate(`/movies/${movie.imdbID}`)} className="hover:cursor-pointer shrink-0 w-32">
                                {movie.Poster !== "N/A" ? (
                                    <img
                                        className="w-32 h-48 object-cover rounded"
                                        src={movie.Poster}
                                        alt={movie.Title}
                                    />
                                    ) : (
                                    <div className="w-32 h-48 bg-gray-300 flex items-center justify-center rounded">
                                        N/A
                                    </div>
                                    )}
                                    <p className="text-sm mt-1 truncate">{movie.Title}</p>
                                </div>
                        ))}
                    </div>
                </div>
            )}
            
            
            {results.length > 0 && (
                <div className="mt-8 w-full">
                    <p className="text-xl">{totalResults} results found</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {results.map((movie)=>(
                            <div key={movie.imdbID} onClick={()=> navigate(`/movies/${movie.imdbID}`)} className="hover:cursor-pointer">
                                {movie.Poster !== "N/A" ? (
                                    <img className="w-full h-64 object-cover" src={movie.Poster} alt={movie.Title}/>
                                ) : (
                                    <div className="h-64 flex items-center justify-center bg-gray-300 text-xl font-bold">No Image Available</div>
                                )}
                                <p className="">{movie.Title}</p>
                                <p className="">{movie.Year}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Search;