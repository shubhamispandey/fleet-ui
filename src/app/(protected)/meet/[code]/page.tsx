"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
// import useMeet from "@hooks/useMeet";
import { io, Socket } from "socket.io-client";
import Image from "next/image";
// import Videos from "@components/meet/Videos";

interface Message {
  user: { name: string; avatar: string };
  message: string;
}

const SOCKET_URL = "http://localhost:8002";

const MeetingPage = ({ params }: { params: { code: string } }) => {
  const socketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [notifications, setNotifications] = useState<string[]>([]);
  // const [loading, setLoading] = useState(true);

  const meetState = useSelector((state: RootState) => state.meet.meeting);
  const authState = useSelector((state: RootState) => state.auth.login);
  // const { getMeetInfo } = useMeet();

  // Fetch meeting info
  // useEffect(() => {
  //   setLoading(true);
  //   getMeetInfo({
  //     email: authState.data?.email,
  //     code: params.code,
  //   }).finally(() => setLoading(false));
  // }, [authState.data?.email, getMeetInfo, params.code]);

  // Initialize socket only once
  useEffect(() => {
    if (!authState.data?.email || !meetState.data) return;

    const socket = io(SOCKET_URL, { transports: ["websocket"] });
    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("join", {
        room: params.code,
        user: authState.data?.name,
      });
    });

    socket.on("message", (data: Message) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("notification", (data: string) => {
      setNotifications((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [authState.data?.email, authState.data?.name, meetState.data, params.code]);

  const sendMessage = useCallback(() => {
    if (inputMessage && socketRef.current) {
      socketRef.current.emit("message", {
        room: params.code,
        message: inputMessage,
        user: authState.data,
      });
      setInputMessage("");
    }
  }, [inputMessage, params.code, authState.data]);

  // if (loading) {
  //   return <div className="p-6">Loading meeting...</div>;
  // }

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Meeting Code: {params.code}</h1>
      {/* <p className="mb-8 bg-blue-800 text-white p-2">
        Created by:{" "}
        {meetState.data?.meeting?.createdBy?.name === authState.data?.name
          ? "You"
          : meetState.data?.meeting?.createdBy?.name}
      </p>
      <span className="p-2 bg-red-900 text-white absolute top-3 right-3 font-bold text-3xl">
        {authState.data?.name}
      </span> */}

      {/* Notifications */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Notifications:</h3>
        <div className="bg-white dark:bg-gray-800 p-4 shadow rounded-lg">
          {notifications.map((note, idx) => (
            <p key={idx} className="text-gray-600 dark:text-gray-300">
              {note}
            </p>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        {/* Chat Section */}
        <div className="max-w-lg mx-auto mb-8">
          <h3 className="text-2xl font-semibold mb-4">Chat:</h3>
          <div className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg mb-6 space-y-4 max-h-96 overflow-y-auto">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-start space-x-4 ${
                  msg.user.name === authState.data?.name ? "justify-end" : ""
                }`}
              >
                {msg.user.name !== authState.data?.name && (
                  <Image
                    src={`/img/avatars/${msg.user.avatar}`}
                    alt={msg.user.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <div
                  className={`flex-1 ${
                    msg.user.name === authState.data?.name ? "text-right" : ""
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-semibold">
                      {msg.user.name}
                    </span>
                  </div>
                  <p
                    className={`bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow-sm leading-relaxed ${
                      msg.user.name === authState.data?.name
                        ? "bg-blue-600 text-white"
                        : ""
                    }`}
                  >
                    {msg.message}
                  </p>
                </div>
                {msg.user.name === authState.data?.name && (
                  <Image
                    src={`/img/avatars/${msg.user.avatar}`}
                    alt={msg.user.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-grow p-3 border rounded-l-lg"
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              className="p-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-all duration-300"
            >
              Send
            </button>
          </div>
        </div>
        {/* {socketRef.current && <Videos socket={socketRef} room={params.code} />} */}
      </div>
    </div>
  );
};

export default MeetingPage;
