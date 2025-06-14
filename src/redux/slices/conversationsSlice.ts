import { createSlice } from "@reduxjs/toolkit";
import {
  getConversationsThunk,
  getMessagesThunk,
  selectConversation,
} from "../actions/conversations";
import { ConversationsState } from "../../types/";

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
    setRecievedConversation: (state, action) => {
      state.allConversations.data.conversations.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // 1 HANDLE GET CONVERSATIONS
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
export const { setRecievedMessage, setRecievedConversation } =
  conversationsSlice.actions;
