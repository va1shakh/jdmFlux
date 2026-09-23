import { createSlice } from "@reduxjs/toolkit";
const user = JSON.parse(localStorage.getItem("user"));
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: user || null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }, 
        logout: (state) => {
           state.user = null;
        }
    }
})
export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;