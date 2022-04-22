import { createSlice } from "@reduxjs/toolkit";
import { IAuthenticationState } from "../type/store";


const initialState: IAuthenticationState = {
    isAuthenticate: false,
    accessToken: "",
    user: null,
}

const slicerAuthor = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticate = true;
            state.accessToken = action.payload;
        },
        storeUser: (state, action) => {
            state.user = action.payload;
        },
        logout: () => initialState,
    }
})

export default slicerAuthor.reducer;
export const { login, logout, storeUser } = slicerAuthor.actions;