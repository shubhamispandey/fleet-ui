import { Dispatch, UnknownAction } from "redux";
import { Socket } from "socket.io-client";
import SOCKET_EVENTS from "@lib/socketEvents";
import {
  setRecievedMessage,
  setRecievedConversation,
  setTypingIndicator,
} from "@redux/slices/conversationsSlice";

type ConversationEventsDeps = {
  dispatch: Dispatch<UnknownAction>;
};

const registerConversationEvents = (
  socket: Socket,
  { dispatch }: ConversationEventsDeps
) => {
  socket.on(SOCKET_EVENTS.RECEIVE_MESSAGE, ({ conversationId, message }) => {
    dispatch(setRecievedMessage({ conversationId, message }));
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
};

export default registerConversationEvents;
