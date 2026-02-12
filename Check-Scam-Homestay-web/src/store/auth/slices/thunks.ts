import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthServices } from "../services/AuthServices";
import { AuthLoginRequest, AuthRegisterRequest, AuthLoginResponse, AuthRegisterResponse } from "./type";
import {ENDPOINTS} from "../constants/endpoints";

export const login = createAsyncThunk(
    ENDPOINTS.LOGIN,
    async (data: AuthLoginRequest) => {
        const response = await AuthServices.login(data);
        return response.data;
    }
);

export const register = createAsyncThunk(
    ENDPOINTS.REGISTER,
    async (data: AuthRegisterRequest) => {
        const response = await AuthServices.register(data);
        return response.data;
    }
);