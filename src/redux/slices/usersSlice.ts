import { createSlice } from "@reduxjs/toolkit";
import { UsersState } from "@/types";
import { getUserThunk } from "../actions/users";

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

      // getUserThunk
      .addCase(getUserThunk.pending, (state) => {
        state.user.loading = true;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.user.loading = false;
        state.user.data = action.payload.data || null;
        state.user.error = null;
      })
      .addCase(getUserThunk.rejected, (state) => {
        state.user.loading = false;
        state.user.data = null;
        state.user.error = "Failed to fetch user data.";
      });
  },
});

export default usersSlice.reducer;
