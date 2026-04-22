import { createSlice, PayloadAction} from "@reduxjs/toolkit"
import { MovieSearchResult } from "../types"

type SearchState = {
    query: string
    results: MovieSearchResult[]
    totalResults: string
}

const initialState : SearchState = {
    query : "",
    results: [],
    totalResults: "0"
}

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setQuery: (state, action:PayloadAction<string>)=>{
            state.query = action.payload
        },
        setResults: (state, action: PayloadAction<{results: MovieSearchResult[], total: string}>)=>{
            state.results = action.payload.results
            state.totalResults = action.payload.total
        },
        clearSearch: (state)=>{
            state.query = "",
            state.results= [],
            state.totalResults= "0"
        }
    }
})


export const {setQuery, setResults, clearSearch} = searchSlice.actions
export default searchSlice.reducer