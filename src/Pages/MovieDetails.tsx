import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { MovieDetails as MovieDetailsType } from "../types";
import { Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addFavorite, removeFavorite } from "../store/favoriteSlice";
import toast from "react-hot-toast";

const apiKey = import.meta.env.VITE_API_URL

const MovieDetails = () => {
    const {id}= useParams();
    const navigate = useNavigate()
    const {data: movie, isLoading, error} = useFetch<MovieDetailsType>(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`)
    
    const dispatch = useDispatch()
    const favorites = useSelector((state: RootState)=> state.favorites.movies)

    const isFavorite = favorites.some((fav)=> fav.imdbID === id)
    
    const handleFavorite = ()=>{
        if(!movie)return

        if(isFavorite){
            dispatch(removeFavorite(movie.imdbID))
            toast.error(`"${movie.Title}" removed from favorites`)
        }else {
            dispatch(addFavorite({
                imdbID: movie.imdbID,
                Title: movie.Title,
                Year: movie.Year,
                Poster: movie.Poster,
                Type: movie.Type
            }))

            toast.success(`"${movie.Title}" added to favorites!`)
        }
    }
    
    
    if(isLoading)return <p className="">Loading movie...</p>
    if(error)return <p className="">Error: {error.message}</p>
    if(!movie)return <p className="">Movie not found</p>
    
    return (
        <div className="flex flex-col items-center p-8">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=> navigate(-1)}>← Back</button>
        
            <div className="bg-white p-6 shadow-md rounded-md">
                <div className="">{movie.Poster !== "N/A" ? <img className="" src={movie.Poster} alt={movie.Title}/> : <div className="">No Image Available</div>}</div>
                <h1 className="text-3xl font-bold">{movie.Title}</h1>
                <p className="text-lg">{movie.Year} • {movie.Genre} • {movie.Runtime}</p>
                <p className="flex items-center"><Star  className={`mr-2 hover:cursor-pointer ${!isFavorite? "bg-transparent" : "fill-amber-300"}`}/><span className="text-xl">{movie.imdbRating}</span></p>
                <p className="">{movie.Plot}</p>
                <p className=""><span className="font-bold">Director: </span>{movie.Director}</p>
                <p className=""><span className="font-bold">Actors: </span>{movie.Actors}</p>
                <button className="" onClick={handleFavorite}>{isFavorite?"Remove from favorites":"Add to favorites"}</button>
            </div>
        </div>
    );
}
 
export default MovieDetails;