import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import favoriteReducer from "./favoriteSlice"
import recentReducer from "./recentSlice"
import searchReducer from "./searchSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        favorites: favoriteReducer,
        recent: recentReducer,
        search : searchReducer,
    }
})

export type RootState =  ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
