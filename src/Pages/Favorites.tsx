import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { removeFavorite } from "../store/favoriteSlice";

const Favorites = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const favorites = useSelector((state: RootState)=> state.favorites.movies)
    return (
        <div className="">
            <h1 className="">My Favorites</h1>
            {favorites.length === 0 && (<p className="">No favourites yet! Add some movies to your list to see them here</p>)}
            <div className="">
                {favorites.map(movie=>(
                    <div className="" key={movie.imdbID}>
                        {movie.Poster!== "N/A"? (<img className="" src={movie.Poster} alt={movie.Title}/>): (<div className="" >No Image Available</div>)}
                        <p className="">{movie.Title}</p>
                        <p className="">{movie.Year}</p>

                        <div className="">
                            <button className="" onClick={()=>navigate(`/movies/${movie.imdbID}`)}>View Details</button>
                            <button className="" onClick={()=> dispatch(removeFavorite(movie.imdbID))}>Remove from favorites</button>
                        </div>
                    </div>

                ))}

            </div>
        </div>
    );
}
 
export default Favorites;