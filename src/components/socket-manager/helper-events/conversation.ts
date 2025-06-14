import { Dispatch, UnknownAction } from "redux";
import { Socket } from "socket.io-client";
import SOCKET_EVENTS from "@lib/socketEvents";
import {
  setRecievedMessage,
  setRecievedConversation,
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
};

export default registerConversationEvents;
