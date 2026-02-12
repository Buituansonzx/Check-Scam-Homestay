import { createSlice } from "@reduxjs/toolkit";
import * as thunks from "./thunks";
import { AuthState, AuthLoginRequest, AuthLoginResponse, AuthRegisterRequest, AuthRegisterResponse } from "./type";
import { setCookie } from "../../../shared/utils/cookie";

const initialState: AuthState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
    isLoading: false,
    error: null,
};



const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isLoading = false;
            state.error = null;
            localStorage.removeItem('user');
            // Remove cookie token logic if needed here or handle in component
        },
        setLoginSuccess: (state, action) => {
            state.isLoading = false;
            state.error = null;
            const { user, access_token } = action.payload;
            if (access_token) {
                setCookie('access_token', access_token);
            }
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                state.user = user;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(thunks.login.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(thunks.login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            // Save token to cookie
            const token = action.payload?.access_token || action.payload?.token || action.payload?.data?.access_token;
            if (token && typeof token === 'string') {
                setCookie('access_token', token);
            }

            // Save user info to localStorage and state
            const user = action.payload?.user || action.payload?.data?.user;
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                state.user = user;
            }
        });
        builder.addCase(thunks.login.rejected, (state, action) => {
            state.isLoading = false;
            // @ts-ignore
            const payload = action.payload as any;
            state.error = payload?.message || action.error.message || 'Đăng nhập thất bại';
        });

        // Register cases
        builder.addCase(thunks.register.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(thunks.register.fulfilled, (state) => {
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(thunks.register.rejected, (state, action) => {
            state.isLoading = false;
            // @ts-ignore
            const payload = action.payload as any;
            state.error = payload?.message || action.error.message || 'Đăng ký thất bại';
        });
    },
});
export const { logout, setLoginSuccess } = AuthSlice.actions;
export default AuthSlice.reducer;