import React from "react";
import Image from "next/image";
import { Check, CheckCircle, Eye } from "lucide-react";
import { Message as MessageType } from "./types";

interface MessageProps {
  message: MessageType;
  isGroupChat?: boolean;
}

const Message: React.FC<MessageProps> = ({ message, isGroupChat = false }) => {
  const isSelf = message.sender === "self";
  let StatusIcon = null;
  if (message.status === "sent") StatusIcon = Check;
  else if (message.status === "delivered") StatusIcon = CheckCircle;
  else if (message.status === "read") StatusIcon = Eye;

  return (
    <div
      className={`flex flex-col gap-1 ${isSelf ? "items-end" : "items-start"}`}
    >
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
        {!isSelf && isGroupChat && (
          <Image
            className="w-5 h-5 rounded-full border border-indigo-100 shadow-sm"
            alt="User Avatar"
            src={message.avatar || "/img/avatars/default.webp"}
            width={20}
            height={20}
          />
        )}
        {!isSelf && isGroupChat && (
          <span className="font-medium text-indigo-600">{message.sender}</span>
        )}
        <span>{message.timestamp}</span>
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
      {isSelf && message.status && StatusIcon && (
        <div className="text-xs mt-1 flex items-center gap-1 text-gray-400">
          <StatusIcon size={14} className="text-xs" />
          <span className="capitalize">{message.status}</span>
        </div>
      )}
    </div>
  );
};

export default Message;
