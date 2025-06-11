import { createSlice } from "@reduxjs/toolkit";
import {
  createConversationThunk,
  getConversationsThunk,
  getMessagesThunk,
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
  messages: {
    loading: false,
    data: {
      messages: {},
    },
    error: null,
  },
};

const conversationsSlice = createSlice({
  initialState,
  name: "conversations",
  reducers: {
    setRecievedMessage: (state, action) => {
      const { conversationId, message } = action.payload;
      if (state.messages.data.messages[conversationId])
        state.messages.data.messages[conversationId].push(message);

      const index = state.allConversations.data.conversations.findIndex(
        (conv) => conv._id === conversationId
      );
      state.allConversations.data.conversations[index].lastMessage = message;
      if (state.selectedConversation.data)
        state.selectedConversation.data.lastMessage = message;
    },
  },
  extraReducers: (builder) => {
    builder
      // 1.HANDLE GET CONVERSATIONS
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
      // 2.HANDLE CREATE CONVERSATION
      .addCase(createConversationThunk.pending, (state) => {
        state.selectedConversation.loading = true;
      })
      .addCase(createConversationThunk.fulfilled, (state, action) => {
        // 2.a SET SELECTED CONVERSATION
        state.selectedConversation.loading = false;
        state.selectedConversation.data = action.payload as Conversation;
        state.selectedConversation.error = null;

        // 2.b ADD NEW CONVERSATION TO ALL CONVERSATIONS AT THE TOP
        state.allConversations.data.conversations.unshift(
          action.payload as Conversation
        );
      })
      .addCase(createConversationThunk.rejected, (state, action) => {
        state.selectedConversation.loading = false;
        state.selectedConversation.error =
          action.error.message || "Failed to create conversation";
      })
      // 3.SELECT A CONVERSATION
      .addCase(selectConversation, (state, action) => {
        state.selectedConversation = action.payload;
      })
      // 4.GET MESSAGES
      .addCase(getMessagesThunk.pending, (state) => {
        state.messages.loading = true;
      })
      .addCase(getMessagesThunk.fulfilled, (state, action) => {
        state.messages.loading = false;
        state.messages.data.messages[action.payload.conversationId] =
          action.payload.messages;
        state.messages.error = null;
      })
      .addCase(getMessagesThunk.rejected, (state) => {
        state.messages.loading = false;
        state.messages.error = "Error Fetching your messages!";
      });
  },
});

export default conversationsSlice.reducer;
export const { setRecievedMessage } = conversationsSlice.actions;
