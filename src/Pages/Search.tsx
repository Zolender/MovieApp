import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { SearchResponse } from "../types";

const apiKey = import.meta.env.API_URL

const Search = () => {

    const navigate = useNavigate()
    const [query, setQuery] =  useState("")
    const [searchUrl, setSearchUrl] = useState("")
    const {data, isLoading, error} = useFetch<SearchResponse>(searchUrl)

    const handleSubmit= (e: React.SubmitEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(!query.trim())return
        setSearchUrl(`https://www.omdabpi.com/?s=${encodeURIComponent(query)}&apikey=${apiKey}`)
    }
    
    return (
        <div className="">
            <h1 className="">Search Movies</h1>
            <form className="">
                <input type="text" value={query} onChange={(e)=> setQuery(e.target.value)} placeholder="Search a movie..." className="" />
                <button className="" disabled={isLoading} type="submit">{isLoading? "Searching...": "Search"}</button>
            
            </form>
            {error && <p className="text-red-400">Error:{error.message}</p>}

            {/* this would be specific for omdbapi site which return .Response === "False" when the fetch goes well but the needed movie isn't found in their db */}
            {data?.Response=== "False" && <p className="">{data.Error}</p>}

            {data?.Response === "True" && (
                <div className="">
                    <p className="">{data.totalResults} results found</p>
                    <div className="">
                        {data.Search.map((movie)=>(
                            <div className="hover:cursor-pointer" key={movie.imdbID} onClick={()=> navigate(`/movies/${movie.imdbID}`)}>
                                {movie.Poster !== "N/A" ? (
                                    <img className="" src={movie.Poster} alt={movie.Title}/>
                                ) : (
                                    <div className="">No Image Available</div>
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