import { apiClient } from "../../../shared/apiClient";
import { ENDPOINTS } from "../constants/endpoints";

export const AuthServices = {
    login: (data: any) => apiClient.post(ENDPOINTS.LOGIN, data),
    register: (data: any) => apiClient.post(ENDPOINTS.REGISTER, data),
}