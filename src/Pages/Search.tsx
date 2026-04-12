import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { SearchResponse } from "../types";

const apiKey = import.meta.env.VITE_API_URL

const Search = () => {

    const navigate = useNavigate()
    const [query, setQuery] =  useState("")
    const [searchUrl, setSearchUrl] = useState("")
    const {data, isLoading, error} = useFetch<SearchResponse>(searchUrl)

    const handleSubmit= (e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        if(!query.trim())return
        setSearchUrl(`https://www.omdbapi.com/?s=${encodeURI(query)}&apikey=${apiKey}`)
    }

    
    return (
        <div className="container mx-auto w-11/12 flex flex-col items-center p-8">
            <h1 className="text-3xl font-bold">Search Movies</h1>
            <form className="flex items-center">
                <input type="text" value={query} onChange={(e)=> setQuery(e.target.value)} placeholder="Search a movie..." className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button onClick={(e)=>handleSubmit(e)} className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">{isLoading? "Searching...": "Search"}</button>
            </form>
            {error && <p className="text-red-400">Error: {error.message}</p>}
            {/* this would be specific for omdbapi site which return .Response === "False" when the fetch goes well but the needed movie isn't found in their db */}
            {data?.Response=== "False" && <p className="text-red-400">{data.Error}</p>}
            {data?.Response === "True" && (
                <div className="mt-8">
                    <p className="text-xl">{data.totalResults} results found</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {data.Search.map((movie)=>(
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