import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import makeApiCall from "@lib/makeApi";
import config from "@lib/config";
import {
  ApiResponse,
  LoginParams,
  RegisterParams,
  VerifyOtpParams,
  ApiError,
  AuthState,
  LoginData,
} from "../../types";
import tokenManager from "@lib/tokenManager";

const authEndPoints = config.apiEndPoints.auth;

// THUNKS
export const registerThunk = createAsyncThunk(
  "auth/register",
  async (payload: RegisterParams, { rejectWithValue }) => {
    try {
      const response: ApiResponse<unknown> = await makeApiCall({
        url: `${authEndPoints.baseUrl}${authEndPoints.register}`,
        method: "POST",
        data: payload,
      });
      return response;
    } catch (error) {
      return rejectWithValue(
        (error as ApiError)?.response?.data?.message || "Registration failed."
      );
    }
  }
);

export const verifyOtpThunk = createAsyncThunk(
  "auth/verifyOtp",
  async (payload: VerifyOtpParams, { rejectWithValue }) => {
    try {
      const response: ApiResponse<unknown> = await makeApiCall({
        url: `${authEndPoints.baseUrl}${authEndPoints.verifyOtp}`,
        method: "POST",
        data: payload,
      });
      return response;
    } catch (error) {
      return rejectWithValue(
        (error as ApiError)?.response?.data?.message ||
          "OTP verification failed."
      );
    }
  }
);

export const resendOtpThunk = createAsyncThunk(
  "auth/resendOtp",
  async (payload: Omit<VerifyOtpParams, "otp">, { rejectWithValue }) => {
    try {
      const response: ApiResponse<unknown> = await makeApiCall({
        url: `${authEndPoints.baseUrl}${authEndPoints.resendOtp}`,
        method: "POST",
        data: payload,
      });
      return response;
    } catch (error) {
      return rejectWithValue(
        (error as ApiError)?.response?.data?.message || "Resending OTP failed."
      );
    }
  }
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (payload: LoginParams, { rejectWithValue }) => {
    try {
      const response: ApiResponse<unknown> = await makeApiCall({
        url: `${authEndPoints.baseUrl}${authEndPoints.login}`,
        method: "POST",
        data: payload,
      });

      if (response.data) {
        const data = response.data as Record<string, unknown>;
        if (data.accessToken) {
          tokenManager.setToken(data.accessToken as string);
        }
      }
      return response;
    } catch (error) {
      return rejectWithValue(
        (error as ApiError)?.response?.data?.message || "Login failed."
      );
    }
  }
);

const authSlice = createSlice({
  initialState: {
    register: {
      loading: false,
    },
    login: {
      loading: false,
      data: {} as LoginData,
    },
  } as AuthState,
  name: "auth",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.pending, (state) => {
        state.register.loading = true;
      })
      .addCase(registerThunk.fulfilled, (state) => {
        state.register.loading = false;
      })
      .addCase(registerThunk.rejected, (state) => {
        state.register.loading = false;
        // Optionally handle error state
      })
      // loginThunk
      .addCase(loginThunk.pending, (state) => {
        state.login.loading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.login.loading = false;
        state.login.data = action.payload.data as LoginData;
      })
      .addCase(loginThunk.rejected, (state) => {
        state.login.loading = false;
        // Optionally handle error state
      });
  },
});

export default authSlice.reducer;
