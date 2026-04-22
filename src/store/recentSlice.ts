import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { MovieSearchResult } from "../types"

type RecentState = {
    movies: MovieSearchResult[]
}

const storedRecent = localStorage.getItem("recentlyViewed")

const initialState : RecentState = {
    movies : storedRecent ? JSON.parse(storedRecent) : []
}

const recentSlice = createSlice({
    name: "recent",
    initialState,
    reducers: {
        addToRecent : (state, action: PayloadAction<MovieSearchResult>)=>{
            const filtered = state.movies.filter(movie => movie.imdbID !== action.payload.imdbID)
            state.movies = [action.payload, ...filtered].slice(0,6)
            localStorage.setItem("recentlyViewed", JSON.stringify(state.movies))
        },
        clearRecent: (state)=>{
            state.movies = [],
            localStorage.removeItem("recentlyViewed")
        }
    }
})

export const {addToRecent, clearRecent} = recentSlice.actions
export default recentSlice.reducer