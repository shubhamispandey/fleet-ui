import React from "react";
import Image from "next/image";
import { MessageType } from "../../../types";

interface MessageProps {
  message: MessageType;
  isGroupChat?: boolean;
  currentUserId: string;
}

const Message: React.FC<MessageProps> = ({
  message,
  isGroupChat = false,
  currentUserId,
}) => {
  const isSelf = message.senderId._id === currentUserId;

  return (
    <div
      className={`flex flex-col gap-1 ${isSelf ? "items-end" : "items-start"}`}
    >
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
        {!isSelf && isGroupChat && (
          <Image
            className="w-5 h-5 rounded-full border border-indigo-100 shadow-sm"
            alt="User Avatar"
            src={message.senderId.avatar || "/img/avatars/default.webp"}
            width={20}
            height={20}
          />
        )}
        {!isSelf && isGroupChat && (
          <span className="font-medium text-indigo-600">
            {message.senderId.name}
          </span>
        )}
        <span>{new Date(message.createdAt).toLocaleTimeString()}</span>
      </div>
      <div
        className={`max-w-[85vw] md:max-w-[65vw] px-4 py-3 rounded-2xl shadow-sm ${
          isSelf
            ? "bg-indigo-600 text-white rounded-br-none"
            : "bg-white text-gray-800 rounded-bl-none border border-gray-100"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
};

export default Message;
