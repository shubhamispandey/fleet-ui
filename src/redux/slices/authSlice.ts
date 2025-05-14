import { createSlice } from "@reduxjs/toolkit";
import { getUserThunk, loginThunk, registerThunk } from "../actions/auth";

const authSlice = createSlice({
  initialState: {
    register: {
      loading: false,
    },
    login: {
      loading: false,
      data: {},
    },
  },
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
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.login.loading = false;
        state.login.data = action.payload.data;
      })
      .addCase(loginThunk.rejected, (state) => {
        state.login.loading = false;
        state.login.data = {};
      })
      // getUserThunk
      .addCase(getUserThunk.pending, (state) => {
        state.login.loading = true;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.login.loading = false;
        state.login.data = action.payload.data;
      })
      .addCase(getUserThunk.rejected, (state) => {
        state.login.loading = false;
        state.login.data = {};
      });
  },
});

export default authSlice.reducer;
