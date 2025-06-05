import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUserThunk } from "@redux/actions/users";
import { UsersState, UserType } from "../../types";
import { toast } from "react-toastify";

const usersSlice = createSlice({
  initialState: {
    user: {
      loading: false,
      data: null,
      error: null,
    },
  } as UsersState,
  name: "users",
  reducers: {
    // Set Status
    setStatus: (state, action) => {
      if (state.user.data) state.user.data.status = action.payload;
      else toast.error("User data not available to set status.");
    },
  },
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
export const { setStatus } = usersSlice.actions;
