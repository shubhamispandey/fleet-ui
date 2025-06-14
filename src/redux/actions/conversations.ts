import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import actionTypes from "../actionTypes";
import makeApiCall from "@lib/makeApi";
import config from "@lib/config";
import UseDrawers from "@hooks/useDrawers";
import {
  ApiError,
  ApiResponse,
  Conversation,
  GetConversationsParams,
  GetMessagesParams,
  MessageResponseData,
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

export const selectConversation = createAction(
  actionTypes.conversations.SELECT_CONVERSATION,
  (payload: SelectedConversationState) => ({
    payload,
  })
);

export const getMessagesThunk = createAsyncThunk(
  actionTypes.conversations.GET_MESSAGES,
  async ({
    page = 1,
    limit = -1,
    search = "",
    conversationId,
  }: GetMessagesParams & { conversationId: string }) => {
    try {
      const response: ApiResponse<MessageResponseData> = await makeApiCall({
        url: `${
          conversationsEndPoints.baseUrl
        }${conversationsEndPoints.getMessages(conversationId)}`,
        method: "GET",
        params: { page, limit, search },
      });

      return { conversationId, messages: response.data.messages };
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
