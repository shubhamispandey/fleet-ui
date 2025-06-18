import { Dispatch, UnknownAction } from "redux";
import { Socket } from "socket.io-client";
import SOCKET_EVENTS from "@lib/socketEvents";
import {
  setRecievedMessage,
  setRecievedConversation,
  setTypingIndicator,
  updateMessageReadStatus,
} from "@redux/slices/conversationsSlice";

type ConversationEventsDeps = {
  dispatch: Dispatch<UnknownAction>;
  currentUserId: string;
};

const registerConversationEvents = (
  socket: Socket,
  { dispatch, currentUserId }: ConversationEventsDeps
) => {
  socket.on(SOCKET_EVENTS.RECEIVE_MESSAGE, ({ conversationId, message }) => {
    dispatch(setRecievedMessage({ conversationId, message, currentUserId }));
  });
  socket.on(SOCKET_EVENTS.RECEIVE_CONVERSATION, (conversation) => {
    dispatch(setRecievedConversation(conversation.data));
  });
  socket.on(
    SOCKET_EVENTS.TYPING_INDICATOR,
    ({ conversationId, userId, isTyping }) => {
      dispatch(setTypingIndicator({ conversationId, userId, isTyping }));
    }
  );
  socket.on(
    SOCKET_EVENTS.MESSAGE_READ,
    ({ conversationId, userId, modifiedCount }) => {
      dispatch(
        updateMessageReadStatus({ conversationId, userId, modifiedCount })
      );
    }
  );
};

export default registerConversationEvents;
