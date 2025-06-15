import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import makeApiCall from "@lib/makeApi";
import config from "@lib/config";
import { UsersState, UserType, ApiResponse, ApiError } from "../../types";

const usersEndPoints = config.apiEndPoints.users;

// THUNK
export const getCurrentUserThunk = createAsyncThunk(
  "users/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response: ApiResponse<UserType> = await makeApiCall({
        url: `${usersEndPoints.baseUrl}${usersEndPoints.getCurrentUser}`,
        method: "GET",
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        (error as ApiError)?.response?.data?.message ||
          "Failed to get user details."
      );
    }
  }
);

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
        state.user.error = null;
      })
      .addCase(getCurrentUserThunk.fulfilled, (state, action) => {
        state.user.loading = false;
        state.user.data = action.payload as UserType | null;
      })
      .addCase(getCurrentUserThunk.rejected, (state, action) => {
        state.user.loading = false;
        state.user.data = null;
        state.user.error = action.payload as string;
      });
  },
});

export default usersSlice.reducer;
export const { setStatus } = usersSlice.actions;
