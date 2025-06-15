import { Dispatch, UnknownAction } from "redux";
import { Socket } from "socket.io-client";
import { setStatus } from "@redux/slices/usersSlice";
import {
  setUserOnlineStatus,
  clearTypingIndicators,
} from "@redux/slices/conversationsSlice";
import SOCKET_EVENTS from "@lib/socketEvents";

/**
 * Registers connection-related socket event listeners.
 * Accepts dependencies (like dispatch, setStatus) as an object for flexibility.
 * This pattern allows you to pass any needed hooks or state setters from SocketManager.
 */
type ConnectionEventsDeps = {
  dispatch: Dispatch<UnknownAction>;
};

const registerConnectionEvents = (
  socket: Socket,
  { dispatch }: ConnectionEventsDeps
) => {
  socket.on("connect", () => {
    dispatch(setStatus("online"));
  });

  socket.on("disconnect", () => {
    setStatus("offline");
  });

  // --- Global Socket Event Listeners (for presence) ---
  socket.on(SOCKET_EVENTS.USER_ONLINE, ({ userId, status }) => {
    // Update user status in conversations
    dispatch(setUserOnlineStatus({ userId, status }));
    console.log(`User ${userId} is now ${status}`);
  });

  socket.on(SOCKET_EVENTS.USER_OFFLINE, ({ userId, status }) => {
    // Update user status in conversations
    dispatch(setUserOnlineStatus({ userId, status }));
    // Clear typing indicators for offline user
    dispatch(clearTypingIndicators({ userId }));
    console.log(`User ${userId} is now ${status}`);
  });

  // Add other global listeners here (e.g., for notifications, general errors)
  socket.on(SOCKET_EVENTS.CHAT_ERROR, (errorData) => {
    console.error("Global Chat Error:", errorData.message);
    // You might dispatch an action to show a global notification/toast
  });
};

export default registerConnectionEvents;
