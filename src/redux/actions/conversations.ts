import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import actionTypes from "../actionTypes";
import makeApiCall from "@lib/makeApi";
import config from "@lib/config";
import UseDrawers from "@hooks/useDrawers";
import {
  ApiError,
  ApiResponse,
  Conversation,
  CreateConversationPayload,
  GetConversationsParams,
  SelectedConversationState,
} from "../../types";

const conversationsEndPoints = config.apiEndPoints.conversations;
const { notify } = UseDrawers();

export const getConversationsThunk = createAsyncThunk(
  actionTypes.conversations.GET_CONVERSATIONS,
  async ({ page = 1, limit = -1, search = "" }: GetConversationsParams) => {
    try {
      const response: ApiResponse<Conversation[]> = await makeApiCall({
        url: conversationsEndPoints.baseUrl,
        method: "GET",
        params: { page, limit, search },
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

export const createConversationThunk = createAsyncThunk(
  actionTypes.conversations.CREATE_CONVERSATION,
  async ({ payload }: { payload: CreateConversationPayload }) => {
    try {
      const response: ApiResponse<unknown> = await makeApiCall({
        url: conversationsEndPoints.baseUrl,
        method: "POST",
        data: payload,
      });
      return response.data;
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

export const selectConversation = createAction(
  actionTypes.conversations.SELECT_CONVERSATION,
  (payload: SelectedConversationState) => ({
    payload,
  })
);
