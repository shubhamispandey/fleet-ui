import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, registerThunk } from "../actions/auth";
import { AuthState, LoginData } from "../../types/login/login.types";

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
      .addCase(loginThunk.fulfilled, (state) => {
        state.login.loading = false;
      })
      .addCase(loginThunk.rejected, (state) => {
        state.login.loading = false;
      });
  },
});

export default authSlice.reducer;
