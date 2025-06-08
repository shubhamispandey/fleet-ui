import { createAsyncThunk } from "@reduxjs/toolkit";
import actionTypes from "../actionTypes";
import makeApiCall from "@lib/makeApi";
import config from "@lib/config";
import UseDrawers from "@hooks/useDrawers";
import { ApiError, ApiResponse, Conversation } from "../../types";

const conversationsEndPoints = config.apiEndPoints.conversations;
const { notify } = UseDrawers();

export const getConversationsThunk = createAsyncThunk(
  actionTypes.conversations.GET_CONVERSATIONS,
  async () => {
    try {
      const response: ApiResponse<Conversation[]> = await makeApiCall({
        url: conversationsEndPoints.baseUrl,
        method: "GET",
        params: { limit: -1 },
      });
      return response.data as Conversation[];
    } catch (error: unknown) {
      const errorMessage = "An error occurred.";

      notify({
        message: (error as ApiError).response?.data?.message ?? errorMessage,
        type: "error",
      });
      throw new Error(errorMessage);
    }
  }
);
