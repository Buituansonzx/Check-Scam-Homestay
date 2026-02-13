import { createSlice } from "@reduxjs/toolkit";
import * as thunks from "./thunks";
import { AuthState, AuthLoginRequest, AuthLoginResponse, AuthRegisterRequest, AuthRegisterResponse } from "./type";

const initialState: AuthState = {
    isLoading: false,
    error: null,
};

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(thunks.login.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(thunks.login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(thunks.login.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || null;
        });
    },
});
export default AuthSlice.reducer;