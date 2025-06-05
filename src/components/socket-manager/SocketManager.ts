// src/components/SocketManager.tsx
"use client"; // If using Next.js App Router and this is a client component

import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { setStatus } from "@redux/slices/usersSlice"; // For presence updates
import SOCKET_EVENTS from "@lib/socketEvents"; // Your socket events map
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_IO_URL; // Make sure this matches your backend

const SocketManager = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.users.user.data);
  const socketRef = useRef<ReturnType<typeof io> | null>(null);

  console.log("SocketManager initialized with user:", currentUser);

  useEffect(() => {
    if (currentUser?._id && !socketRef.current) {
      console.log("Attempting Socket.IO connection to:", SOCKET_URL);
      const newSocket = io(SOCKET_URL, {
        withCredentials: true, // Crucial for sending HTTP-only cookies
        transports: ["websocket"], // Use WebSocket transport
        extraHeaders: {
          Cookie: `accessToken=${localStorage}`,
        },
      });

      socketRef.current = newSocket;

      newSocket.on("connect", () => {
        dispatch(setStatus("online"));
      });

      newSocket.on("disconnect", () => {
        dispatch(setStatus("offline"));
      });

      // --- Global Socket Event Listeners (for presence) ---
      newSocket.on(SOCKET_EVENTS.USER_ONLINE, ({ userId, status }) => {
        // This will be handled in Dashboard.tsx for allUsers list
        console.log(`User ${userId} is now ${status}`);
      });

      newSocket.on(SOCKET_EVENTS.USER_OFFLINE, ({ userId, status }) => {
        // This will be handled in Dashboard.tsx for allUsers list
        console.log(`User ${userId} is now ${status}`);
      });

      // Add other global listeners here (e.g., for notifications, general errors)
      newSocket.on(SOCKET_EVENTS.CHAT_ERROR, (errorData) => {
        console.error("Global Chat Error:", errorData.message);
        // You might dispatch an action to show a global notification/toast
      });

      // Cleanup on unmount or when user logs out
      return () => {
        newSocket.disconnect();
        socketRef.current = null;
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?._id, dispatch]); // Only re-run when currentUser or socket changes

  return null; // This component doesn't render anything visually
};

export default SocketManager;
