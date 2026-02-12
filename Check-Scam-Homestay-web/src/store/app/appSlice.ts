import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { apiClient, toApiError } from 'shared/apiClient';

export type AppState = {
  status: 'idle' | 'loading' | 'failed';
  error?: string;
  lastPingAt?: number;
};

const initialState: AppState = {
  status: 'idle',
};

// Template thunk: use this pattern for real endpoints.
export const pingApi = createAsyncThunk('app/pingApi', async () => {
  try {
    await apiClient.get('/health');
    return { ok: true as const };
  } catch (error) {
    throw toApiError(error);
  }
});

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(pingApi.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(pingApi.fulfilled, (state) => {
        state.status = 'idle';
        state.lastPingAt = Date.now();
      })
      .addCase(pingApi.rejected, (state, action) => {
        state.status = 'failed';
        const payloadMessage = (action.error?.message || '').trim();
        state.error = payloadMessage.length > 0 ? payloadMessage : 'Request failed';
      });
  },
});

export default appSlice.reducer;
