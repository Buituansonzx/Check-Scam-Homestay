import axios, { AxiosError, type AxiosInstance } from 'axios';

import { getEnvString } from './env';

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
  return axios.create({
    baseURL: parseBaseUrl(),
    timeout: parseTimeoutMs(),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export const apiClient = createApiClient();
