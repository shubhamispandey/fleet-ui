"use client";

import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { useCallback, useEffect, useRef, useState } from "react";
import useMeet from "@hooks/useMeet";
import { io } from "socket.io-client";
import Image from "next/image";
import Videos from "@components/meet/Videos";

const MeetingPage = ({ params }: { params: { code: string } }) => {
  const socket = useRef<any>(null);

  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const meetState: any = useTypedSelector((state) => state.meet.meeting);
  const authState: any = useTypedSelector((state) => state.auth.login);
  const { getMeetInfo } = useMeet();
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [notifications, setNotifications] = useState<string[]>([]);

  socket.current =
    authState.data?.email && meetState.data
      ? io("http://localhost:8002", {
          transports: ["websocket"],
        })
      : null;

  useEffect(() => {
    getMeetInfo({
      email: authState.data?.email,
      code: params.code,
    });
  }, [authState.data, getMeetInfo, params.code]);

  useEffect(() => {
    if (!socket.current) return;

    // Handle socket connection
    socket.current.on("connect", () => {
      console.log(`⚡: ${socket.current.id} user just connected!`);
      socket.current.emit("join", {
        room: params.code,
        user: authState.data?.name,
      });
    });

    // Listen for chat messages
    socket.current.on("message", (data: any) => {
      console.log(data);
      setMessages((prev) => [...prev, data]);
    });

    // Listen for notifications
    socket.current.on("notification", (data: any) => {
      setNotifications((prev) => [...prev, data]);
    });

    socket.current.on("disconnect", () => {
      console.log("❌ A user disconnected");
    });
  }, [meetState.data, params.code]);

  const sendMessage = () => {
    if (inputMessage) {
      socket.current.emit("message", {
        room: params.code,
        message: inputMessage,
        user: authState?.data,
      });
      setInputMessage("");
    }
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Meeting Code: {params.code}
      </h1>
      <p className=" dark:text-gray-300 mb-8 bg-blue-800 text-white p-2">
        Created by:{" "}
        {meetState.data?.meeting?.createdBy?.name === authState.data?.name
          ? "You"
          : meetState.data?.meeting?.createdBy?.name}
      </p>
      <span className="p-2 bg-red-900 text-white absolute top-3 right-3 font-bold text-3xl">
        {authState.data?.name}
      </span>

      {/* Notifications */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Notifications:
        </h3>
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
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Chat:
          </h3>

          <div className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg mb-6 space-y-4 max-h-96 overflow-y-auto">
            {messages.map((msg: any, idx) => (
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
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {msg.user.name}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {/* Time or status */}
                    </span>
                  </div>
                  <p
                    className={`text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow-sm leading-relaxed ${
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
              className="flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 focus:border-blue-400 dark:focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              className="p-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-300"
            >
              Send
            </button>
          </div>
        </div>

        {socket.current && <Videos socket={socket} room={params.code} />}
      </div>
    </div>
  );
};

export default MeetingPage;
