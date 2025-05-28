import { createAsyncThunk } from "@reduxjs/toolkit";
import actionTypes from "../actionTypes";
import makeApiCall from "@/lib/makeApi";
import config from "@/lib/config";
import { ApiResponse, ApiError } from "@/types";

const usersEndPoints = config.apiEndPoints.users;

export const getUserThunk = createAsyncThunk(
  actionTypes.auth.GETUSER,
  async (redirect: (path: string) => void, { rejectWithValue }) => {
    try {
      const response: ApiResponse = await makeApiCall({
        url: `${usersEndPoints.baseUrl}${usersEndPoints.getCurrentUser}`,
        method: "GET",
      });

      if (response.status === 200) {
        return response;
      }

      // localStorage.clear();
      // redirect("/");

      return rejectWithValue(response.message || "Failed to get user details.");
    } catch (error) {
      const errorMessage =
        (error as ApiError)?.response?.data?.message ||
        "An unexpected error occurred";

      // localStorage.clear();
      // redirect("/");

      return rejectWithValue(errorMessage);
    }
  }
);
