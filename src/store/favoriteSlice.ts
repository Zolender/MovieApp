import { createSlice , PayloadAction} from "@reduxjs/toolkit";
import { MovieSearchResult } from "../types"

type FavoriteState= {
    movies: MovieSearchResult[]
}

const storedFavorites = localStorage.getItem("favorites");

const initialState: FavoriteState={
    movies: storedFavorites? JSON.parse(storedFavorites): []
}

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorite: (state, action:PayloadAction<MovieSearchResult>)=>{
            const exist = state.movies.find((movie)=> movie.imdbID === action.payload.imdbID)
            if(!exist){
                state.movies.push(action.payload)
                localStorage.setItem("favorites", JSON.stringify(state.movies))
            }
        },
        removeFavorite: (state, action: PayloadAction<string>)=>{
            state.movies = state.movies.filter((movie)=> movie.imdbID!==action.payload)
            localStorage.setItem("favorites", JSON.stringify(state.movies))
        }
    }
})

export const {addFavorite, removeFavorite}= favoritesSlice.actions

export default favoritesSlice.reducer