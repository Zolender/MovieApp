import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { SearchResponse } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setQuery, setResults, setFeatured, appendResults, incrementPage } from "../store/searchSlice";
import { Clock } from "lucide-react";
import SkeletonCard from "../components/SkeletonCard";

const apiKey = import.meta.env.VITE_API_URL

const featuredTerms = ["marvel", 'batman', 'star wars', "harry potter", "james bond", "lord of the rings", "spiderman", "daredevil", "fast and furious", "chuck"]

const Search = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [searchUrl, setSearchUrl] = useState("")
    const {data, isLoading, error} = useFetch<SearchResponse>(searchUrl)

    const {query, results, totalResults, featured, page} = useSelector((state: RootState)=> state.search)
    const recentMovies = useSelector((state: RootState)=> state.recent.movies)

    const [featuredUrl, setFeaturedUrl] = useState("")
    const {data: featuredData, isLoading: featuredLoading} = useFetch<SearchResponse>(featuredUrl)

    useEffect(()=>{
        if(featured.length === 0){
            const randomTerm = featuredTerms[Math.floor(Math.random() * featuredTerms.length)]
            setFeaturedUrl(`https://www.omdbapi.com/?s=${randomTerm}&apikey=${apiKey}`)
        }
    },[])

    
    useEffect(()=>{
        if(featuredData?.Response === "True"){
            dispatch(setFeatured(featuredData.Search))
        }
    },[featuredData, dispatch])

    //trigger fetching after 600ms 
    useEffect(()=>{
        if(!query.trim())return
        const timer= setTimeout(()=>{
            setSearchUrl(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&page=1&apikey=${apiKey}`)
        }, 600)

        return ()=> clearTimeout(timer)
    }, [query])

    
    useEffect(()=>{
        if(data?.Response === "True"){
            if(page === 1){
                dispatch(setResults({results: data.Search, total: data.totalResults}))
            }else{
                dispatch(appendResults({results: data.Search, total: data.totalResults}))
            }
        }
    }, [data, dispatch])

    const handleLoadMore = ()=>{
        const nextPage = page + 1
        dispatch(incrementPage())
        setSearchUrl(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&page=${nextPage}&apikey=${apiKey}`)
    }

    const hasMore = results.length < parseInt(totalResults)

    const renderSkeletons = () => (
        <div className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 w-full">
            {Array.from({length: 8}).map((_, i)=>(
                <SkeletonCard key={i}/>
            ))}
        </div>
    )

    
    return (
        <div className="container mx-auto w-11/12 flex flex-col items-center p-8">
            <h1 className="text-3xl font-bold">Search Movies</h1>
            <div className="flex items-center w-1/4 max-w-lg mt-4">
                <input type="text" value={query} onChange={(e)=> dispatch(setQuery(e.target.value))} placeholder="Search a movie..." className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none" />
            </div>
            {error && <p className="text-red-400">Error: {error.message}</p>}
            {/* this is specific for omdbapi site which return .Response === "False" when the fetch goes well but the needed movie isn't found in their db */}
            {data?.Response=== "False" && <p className="text-red-400">{data.Error}</p>}
            
            {!query && (
                <>
                    {recentMovies.length > 0 && results.length === 0 && (
                <div className="w-full mt-8">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
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
            
            
                {/* featured movies */}
                <div className="w-full mt-8">
                    <h2 className="text-xl font-bold mb-4">Featured Movies</h2>
                    {featuredLoading && renderSkeletons()}
                    {featured.length > 0 && ( 
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {featured.map((movie)=>(
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
                    )}
                </div>
            </>
        )} 
            
            

            {query && (
                <div className="mt-8 w-full">
                    {isLoading && page === 1 && renderSkeletons()}
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
                            {/* load more section  */}
                            {hasMore && (
                                <div className="flex justify-center mt-8">
                                    <button onClick={handleLoadMore} disabled={isLoading} className="bg-blue-500 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-2 px-8 rounded">{isLoading? "Loading..." : "Load More"}</button>
                                </div>
                            )}

                            {isLoading && page > 1 && renderSkeletons()}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Search;