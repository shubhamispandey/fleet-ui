import { createSlice } from "@reduxjs/toolkit";
import { getUserThunk, loginThunk, registerThunk } from "../actions/auth";
import { ApiResponse } from "@/types";
import { AuthState, LoginData } from "@/types/login/login.types";

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
      })
      // loginThunk
      .addCase(loginThunk.pending, (state) => {
        state.login.loading = true;
      })
      .addCase(
        loginThunk.fulfilled,
        (state, action: { payload: ApiResponse }) => {
          state.login.loading = false;
          state.login.data = (action.payload.data || {}) as LoginData;
        }
      )
      .addCase(loginThunk.rejected, (state) => {
        state.login.loading = false;
        state.login.data = {} as LoginData;
      })
      // getUserThunk
      .addCase(getUserThunk.pending, (state) => {
        state.login.loading = true;
      })
      .addCase(
        getUserThunk.fulfilled,
        (state, action: { payload: ApiResponse }) => {
          state.login.loading = false;
          state.login.data = (action.payload.data || {}) as LoginData;
        }
      )
      .addCase(getUserThunk.rejected, (state) => {
        state.login.loading = false;
        state.login.data = {} as LoginData;
      });
  },
});

export default authSlice.reducer;
