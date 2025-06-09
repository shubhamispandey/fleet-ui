import { createSlice } from "@reduxjs/toolkit";
import {
  createConversationThunk,
  getConversationsThunk,
  selectConversation,
} from "../actions/conversations";
import { Conversation, ConversationsState } from "../../types/";

const initialState: ConversationsState = {
  allConversations: {
    loading: false,
    data: {
      conversations: [],
    },
    error: null,
  },
  selectedConversation: {
    loading: false,
    data: null,
    error: null,
  },
};

const conversationsSlice = createSlice({
  initialState,
  name: "conversations",
  reducers: {},
  extraReducers: (builder) => {
    builder
      // HANDLE GET CONVERSATIONS
      .addCase(getConversationsThunk.pending, (state) => {
        state.allConversations.loading = true;
      })
      .addCase(getConversationsThunk.fulfilled, (state, action) => {
        state.allConversations.loading = false;
        if (Array.isArray(action.payload)) {
          state.allConversations.data = {
            conversations: action.payload,
          };
        } else {
          state.allConversations.data = action.payload ?? {
            conversations: [],
          };
        }
      })
      .addCase(getConversationsThunk.rejected, (state) => {
        state.allConversations.loading = false;
      })
      // // HANDLE CREATE CONVERSATION
      .addCase(createConversationThunk.pending, (state) => {
        state.selectedConversation.loading = true;
      })
      .addCase(createConversationThunk.fulfilled, (state, action) => {
        // 1. SET SELECTED CONVERSATION
        state.selectedConversation.loading = false;
        state.selectedConversation.data = action.payload as Conversation;
        state.selectedConversation.error = null;

        // 2. ADD NEW CONVERSATION TO ALL CONVERSATIONS AT THE TOP
        state.allConversations.data.conversations.unshift(
          action.payload as Conversation
        );
      })
      .addCase(createConversationThunk.rejected, (state, action) => {
        state.selectedConversation.loading = false;
        state.selectedConversation.error =
          action.error.message || "Failed to create conversation";
      })
      .addCase(selectConversation, (state, action) => {
        state.selectedConversation = action.payload;
      });
  },
});

export default conversationsSlice.reducer;
