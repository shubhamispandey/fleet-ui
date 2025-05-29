import { createSlice } from "@reduxjs/toolkit";
import { UsersState, UserType } from "@/types";
import { getCurrentUserThunk } from "../actions/users";

const usersSlice = createSlice({
  initialState: {
    user: {
      loading: false,
      data: null,
      error: null,
    },
  } as UsersState,
  name: "users",
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getCurrentUserThunk
      .addCase(getCurrentUserThunk.pending, (state) => {
        state.user.loading = true;
      })
      .addCase(getCurrentUserThunk.fulfilled, (state, action) => {
        state.user.loading = false;
        state.user.data = action.payload.data as UserType | null;
        state.user.error = null;
      })
      .addCase(getCurrentUserThunk.rejected, (state) => {
        state.user.loading = false;
        state.user.data = null;
        state.user.error = "Failed to fetch user data.";
      });
  },
});

export default usersSlice.reducer;
