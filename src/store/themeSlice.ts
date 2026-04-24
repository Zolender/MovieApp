import { createSlice } from "@reduxjs/toolkit"
import { ThemeState } from "../types"

const storedTheme = localStorage.getItem("theme")

const initialState: ThemeState = {
    theme : storedTheme==="dark" || storedTheme==="light"? storedTheme : "light"
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme : (state)=> {
            state.theme = state.theme === "light" ? "dark" : "light"
            localStorage.setItem("theme", state.theme)
        }
    }
})

export const {toggleTheme} = themeSlice.actions

export default themeSlice.reducer