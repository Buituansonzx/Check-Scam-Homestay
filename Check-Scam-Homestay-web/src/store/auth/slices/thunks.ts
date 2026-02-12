import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthServices } from "../services/AuthServices";
import { AuthLoginRequest, AuthRegisterRequest, AuthLoginResponse, AuthRegisterResponse } from "./type";
import {ENDPOINTS} from "../constants/endpoints";

export const login = createAsyncThunk(
    ENDPOINTS.LOGIN,
    async (data: AuthLoginRequest, { rejectWithValue }) => {
        try {
            const response = await AuthServices.login(data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || { message: 'Đăng nhập thất bại' });
        }
    }
);

export const register = createAsyncThunk(
    ENDPOINTS.REGISTER,
    async (data: AuthRegisterRequest, { rejectWithValue }) => {
        try {
            const response = await AuthServices.register(data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || { message: 'Đăng ký thất bại' });
        }
    }
);