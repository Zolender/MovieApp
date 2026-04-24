import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import favoriteReducer from "./favoriteSlice"
import recentReducer from "./recentSlice"
import searchReducer from "./searchSlice"
import themeReducer from "./themeSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        favorites: favoriteReducer,
        recent: recentReducer,
        search : searchReducer,
        theme: themeReducer
    }
})

export type RootState =  ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
