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
    setTypingIndicator: (state, action) => {
      const { conversationId, userId, isTyping } = action.payload;

      // Helper function to update typing state
      const updateTypingState = (conversation: {
        typing?: Record<string, boolean>;
      }) => {
        if (!conversation.typing) {
          conversation.typing = {};
        }
        if (isTyping) {
          conversation.typing[userId] = true;
        } else {
          delete conversation.typing[userId];
          // Clean up empty typing object
          if (Object.keys(conversation.typing).length === 0) {
            delete conversation.typing;
          }
        }
      };

      // Update all conversations
      state.allConversations.data.conversations.forEach((conversation) => {
        if (conversation._id === conversationId) {
          updateTypingState(conversation);
        }
      });

      // Update selected conversation
      if (
        state.selectedConversation.data &&
        state.selectedConversation.data._id === conversationId
      ) {
        updateTypingState(state.selectedConversation.data);
      }
    },
    clearTypingIndicators: (state, action) => {
      const { userId } = action.payload;

      // Clear typing for specific user across all conversations
      state.allConversations.data.conversations.forEach((conversation) => {
        if (conversation.typing && conversation.typing[userId]) {
          delete conversation.typing[userId];
          if (Object.keys(conversation.typing).length === 0) {
            delete conversation.typing;
          }
        }
      });

      // Clear from selected conversation
      if (state.selectedConversation.data?.typing?.[userId]) {
        delete state.selectedConversation.data.typing[userId];
        if (Object.keys(state.selectedConversation.data.typing).length === 0) {
          delete state.selectedConversation.data.typing;
        }
      }
    },
    clearAllTypingIndicators: (state, action) => {
      const { conversationId } = action.payload;

      // Clear all typing indicators for a specific conversation
      state.allConversations.data.conversations.forEach((conversation) => {
        if (conversation._id === conversationId) {
          delete conversation.typing;
        }
      });

      if (
        state.selectedConversation.data &&
        state.selectedConversation.data._id === conversationId
      ) {
        delete state.selectedConversation.data.typing;
      }
    },
    setUserOnlineStatus: (state, action) => {
      const { userId, status } = action.payload;

      // Update user status in all conversations
      state.allConversations.data.conversations.forEach((conversation) => {
        conversation.participants.forEach((participant) => {
          if (participant._id === userId) {
            participant.status = status;
          }
        });
      });

      // Update user status in selected conversation if it exists
      if (state.selectedConversation.data) {
        state.selectedConversation.data.participants.forEach((participant) => {
          if (participant._id === userId) {
            participant.status = status;
          }
        });
      }
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
export const {
  setRecievedMessage,
  setRecievedConversation,
  setUserOnlineStatus,
  setTypingIndicator,
  clearTypingIndicators,
  clearAllTypingIndicators,
} = conversationsSlice.actions;
