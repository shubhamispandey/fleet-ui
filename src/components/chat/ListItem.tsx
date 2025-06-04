import React from "react";
import Image from "next/image";
import { Chat } from "./types";

interface ChatListItemProps {
  chat: Chat;
  isActive?: boolean;
  onClick: () => void;
}

const ChatListItem: React.FC<ChatListItemProps> = ({
  chat,
  isActive = false,
  onClick,
}) => (
  <li
    className={`relative transition-all ${
      isActive ? "bg-indigo-50 border-l-4 border-indigo-500" : ""
    }`}
    onClick={onClick}
  >
    <div className="flex items-center gap-3 px-4 py-3 cursor-pointer border-b border-gray-100 hover:bg-indigo-50 transition-all">
      <div className="relative">
        <Image
          className="w-12 h-12 rounded-xl border border-indigo-100 shadow-sm"
          alt={`${chat.name}'s Avatar`}
          src={chat.avatar}
          width={48}
          height={48}
        />
        {chat.isOnline && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h2
            className={`font-semibold truncate ${
              isActive ? "text-indigo-700" : "text-gray-800"
            }`}
          >
            {chat.name}
          </h2>
          <span className="text-xs text-gray-400 whitespace-nowrap">
            {chat.timestamp}
          </span>
        </div>
        <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
      </div>
      {chat.unread > 0 && (
        <span className="bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {chat.unread}
        </span>
      )}
    </div>
  </li>
);

export default ChatListItem;
