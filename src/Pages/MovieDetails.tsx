import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { MovieDetails } from "../types";

const apiKey = import.meta.env.API_URL

const MovieDetails = () => {
    const {id}= useParams();
    const navigate = useNavigate()
    const {data: movie, isLoading, error} = useFetch<MovieDetails>(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`)
    
    if(isLoading)return <p className="">Loading movie...</p>
    if(error)return <p className="">Error: {error.message}</p>
    if(!movie)return <p className="">Movie not found</p>
    
    return (
        <div className="">
            <button className="" onClick={()=> navigate(-1)}>← Back</button>
        
            <div className="">
                <p className="">{movie.Title}</p>
                <p className="">{movie.Year} • {movie.Genre} • {movie.Runtime}</p>
                <p className="">{movie.imdbRating}</p>
                <p className="">{movie.Plot}</p>
                <p className=""><span className="">Director: </span>{movie.Director}</p>
                <p className=""><span className="">Actors: </span>{movie.Actors}</p>

                

            </div>
        
        </div>
    );
}
 
export default MovieDetails;