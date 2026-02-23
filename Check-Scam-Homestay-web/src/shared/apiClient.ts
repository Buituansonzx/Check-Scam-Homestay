import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import { getEnvString } from './env';
import { getCookie } from './utils/cookie';

export class ApiError extends Error {
  status?: number;
  data?: unknown;

  constructor(message: string, options?: { status?: number; data?: unknown }) {
    super(message);
    this.name = 'ApiError';
    this.status = options?.status;
    this.data = options?.data;
  }
}

function parseTimeoutMs(): number {
  const raw = getEnvString('API_TIMEOUT_MS') ?? getEnvString('API_TIMEOUT');
  const parsed = raw ? Number(raw) : NaN;
  if (Number.isFinite(parsed) && parsed > 0) return parsed;
  return 15000;
}

function parseBaseUrl(): string | undefined {
  return getEnvString('API_BASE_URL') ?? getEnvString('REACT_APP_API_BASE_URL');
}

export function toApiError(error: unknown): Error {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    return new ApiError(axiosError.message, {
      status: axiosError.response?.status,
      data: axiosError.response?.data,
    });
  }

  if (error instanceof Error) return new ApiError(error.message);
  return new ApiError('Unknown error');
}

export function createApiClient(): AxiosInstance {
  const instance = axios.create({
    baseURL: parseBaseUrl(),
    timeout: parseTimeoutMs(),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

  // Add a request interceptor to attach the token dynamically
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getCookie('access_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
}

export const apiClient = createApiClient();
