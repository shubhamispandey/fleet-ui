// src/components/SocketManager.tsx
"use client"; // If using Next.js App Router and this is a client component

import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setSocket } from "@redux/slices/socketSlice";
import registerConnectionEvents from "./helper-events/connection";
import registerMessageEvents from "./helper-events/conversation";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_IO_URL;

const SocketManager = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.users.user.data);
  const socketRef = useRef<ReturnType<typeof io> | null>(null);

  useEffect(() => {
    if (currentUser?._id && !socketRef.current) {
      const newSocket = io(SOCKET_URL, {
        withCredentials: true, // Crucial for sending HTTP-only cookies
        transports: ["websocket"], // Use WebSocket transport
        extraHeaders: {
          Cookie: `accessToken=${localStorage}`,
        },
      });

      socketRef.current = newSocket;
      dispatch(setSocket(newSocket));
      registerConnectionEvents(newSocket, { dispatch });
      registerMessageEvents(newSocket, { dispatch });

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
