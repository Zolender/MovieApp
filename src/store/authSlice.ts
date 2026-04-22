import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { User } from "../types"

type AuthState = {
    currentUser: User | null
}

const storedUser = localStorage.getItem("currentUser")

const initialState : AuthState = {
    currentUser : storedUser? JSON.parse(storedUser): null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        loginUser: (state, action: PayloadAction<User>)=>{
            state.currentUser = action.payload
            localStorage.setItem("currentUser", JSON.stringify(action.payload))
        },
        logoutUser: (state)=>{
            state.currentUser = null
            localStorage.removeItem("currentUser")
        }
    }
})


export const {loginUser, logoutUser} = authSlice.actions
export default authSlice.reducer