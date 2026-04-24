import { createSlice, PayloadAction} from "@reduxjs/toolkit"
import { MovieSearchResult, SearchState } from "../types"



const initialState : SearchState = {
    query : "",
    results: [],
    totalResults: "0",
    featured: [],
    page: 1,
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
        appendResults : (state, action: PayloadAction<{results: MovieSearchResult[], total: string}>)=>{
            state.results = [...state.results, ...action.payload.results]
            state.totalResults = action.payload.total
        },

        setFeatured:(state, action: PayloadAction<MovieSearchResult[]>)=>{
            state.featured = action.payload
        },

        incrementPage: (state)=>{
            state.page+= 1
        },
        clearSearch: (state)=>{
            state.query = "",
            state.results= [],
            state.totalResults= "0",
            state.page = 1
        }
    }
})


export const {setQuery, setResults, clearSearch, incrementPage, setFeatured, appendResults} = searchSlice.actions
export default searchSlice.reducer