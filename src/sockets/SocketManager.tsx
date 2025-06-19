// src/components/SocketManager.tsx
"use client"; // If using Next.js App Router and this is a client component

import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setSocket } from "@redux/slices/socketSlice";
import registerConnectionEvents from "./helper-events/connection";
import registerConversationEvents from "./helper-events/conversation";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_IO_URL || "";

const SocketManager = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.users.user.data);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (currentUser?._id && !socketRef.current) {
      const accessToken = localStorage.getItem("accessToken");
      const newSocket = io(SOCKET_URL, {
        withCredentials: true,
        transports: ["websocket"],
        extraHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      socketRef.current = newSocket;
      dispatch(setSocket(newSocket));
      registerConnectionEvents(newSocket, { dispatch });
      registerConversationEvents(newSocket, {
        dispatch,
        currentUserId: currentUser._id,
      });

      return () => {
        newSocket.disconnect();
        socketRef.current = null;
      };
    }
  }, [currentUser?._id, dispatch]);

  return null;
};

export default SocketManager;
