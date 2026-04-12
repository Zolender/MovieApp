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
        </div>
    );
}
 
export default Search;