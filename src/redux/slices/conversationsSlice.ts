import { createSlice } from "@reduxjs/toolkit";
import { getConversationsThunk } from "../actions/conversations";
import { ConversationsState } from "../../types/";

const initialState: ConversationsState = {
  allConversations: {
    loading: false,
    data: {
      conversations: [],
    },
    error: null,
  },
};

const conversationsSlice = createSlice({
  initialState,
  name: "conversations",
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default conversationsSlice.reducer;
