import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { MovieDetails } from "../types";
import { Star } from "lucide-react";

const apiKey = import.meta.env.VITE_API_URL

const MovieDetails = () => {
    const {id}= useParams();
    const navigate = useNavigate()
    const {data: movie, isLoading, error} = useFetch<MovieDetails>(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`)
    
    if(isLoading)return <p className="">Loading movie...</p>
    if(error)return <p className="">Error: {error.message}</p>
    if(!movie)return <p className="">Movie not found</p>
    
    return (
        <div className="flex flex-col items-center p-8">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=> navigate(-1)}>← Back</button>
        
            <div className="bg-white p-6 shadow-md rounded-md">
                <h1 className="text-3xl font-bold">{movie.Title}</h1>
                <p className="text-lg">{movie.Year} • {movie.Genre} • {movie.Runtime}</p>
                <p className="flex items-center"><Star fill="yellow" className="mr-2"/><span className="text-xl">{movie.imdbRating}</span></p>
                <p className="">{movie.Plot}</p>
                <p className=""><span className="font-bold">Director: </span>{movie.Director}</p>
                <p className=""><span className="font-bold">Actors: </span>{movie.Actors}</p>

                
            </div>
        
        </div>
    );
}
 
export default MovieDetails;