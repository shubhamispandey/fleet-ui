import { Dispatch, UnknownAction } from "redux";
import { Socket } from "socket.io-client";
import SOCKET_EVENTS from "@lib/socketEvents";
import { setRecievedMessage } from "@redux/slices/conversationsSlice";

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
};

export default registerConversationEvents;
