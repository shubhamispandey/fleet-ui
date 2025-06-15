import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import makeApiCall from "@lib/makeApi";
import config from "@lib/config";
import {
  ApiResponse,
  Conversation,
  ConversationsState,
  GetConversationsParams,
  GetMessagesParams,
  MessageResponseData,
  SelectedConversationState,
} from "../../types";

const conversationsEndPoints = config.apiEndPoints.conversations;

// THUNKS
export const getConversationsThunk = createAsyncThunk(
  "conversations/getConversations",
  async (
    { page = 1, limit = -1, search = "" }: GetConversationsParams,
    { rejectWithValue }
  ) => {
    try {
      const response: ApiResponse<Conversation[]> = await makeApiCall({
        url: conversationsEndPoints.baseUrl,
        method: "GET",
        params: { page, limit, search },
      });
      return response.data as Conversation[];
    } catch {
      // Notifications should be handled in the component that dispatches this thunk.
      return rejectWithValue("An error occurred while fetching conversations.");
    }
  }
);

export const getMessagesThunk = createAsyncThunk(
  "conversations/getMessages",
  async (
    {
      page = 1,
      limit = -1,
      search = "",
      conversationId,
    }: GetMessagesParams & { conversationId: string },
    { rejectWithValue }
  ) => {
    try {
      const response: ApiResponse<MessageResponseData> = await makeApiCall({
        url: `${
          conversationsEndPoints.baseUrl
        }${conversationsEndPoints.getMessages(conversationId)}`,
        method: "GET",
        params: { page, limit, search },
      });
      return { conversationId, messages: response.data.messages };
    } catch {
      // Notifications should be handled in the component that dispatches this thunk.
      return rejectWithValue("An error occurred while fetching messages.");
    }
  }
);

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
    selectConversation: (
      state,
      action: PayloadAction<SelectedConversationState>
    ) => {
      state.selectedConversation = action.payload;
    },
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
      .addCase(getConversationsThunk.rejected, (state, action) => {
        state.allConversations.loading = false;
        state.allConversations.error = action.payload as string;
      })

      // 3.SELECT A CONVERSATION - is now a reducer
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
      .addCase(getMessagesThunk.rejected, (state, action) => {
        state.messages.loading = false;
        state.messages.error = action.payload as string;
      });
  },
});

export default conversationsSlice.reducer;
export const {
  selectConversation,
  setRecievedMessage,
  setRecievedConversation,
  setUserOnlineStatus,
  setTypingIndicator,
  clearTypingIndicators,
  clearAllTypingIndicators,
} = conversationsSlice.actions;
