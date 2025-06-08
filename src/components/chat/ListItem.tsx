import React from "react";
import Image from "next/image";
import { Conversation } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";

interface ConversationItemProps {
  conversation: Conversation;
}

const ChatListItem: React.FC<ConversationItemProps> = ({ conversation }) => {
  const user = useSelector((state: RootState) => state.users.user.data);
  // const isGroup = conversation.type === "group";
  const participants = conversation.participants.filter(
    (participant) => user && participant._id !== user._id
  );
  const isOnline = participants.some(
    (participant) => participant.status === "online"
  );
  const avatars = participants.map((participant) => participant.avatar);
  const unreadCount = conversation.unreadCount || 0;

  const getName = () => {
    if (conversation.type === "group") {
      return conversation.name || "Group Chat";
    } else {
      return participants?.[0]?.name || "Unknown User";
    }
  };

  return (
    <li
      className={`relative transition-all ${
        true ? "bg-indigo-50 border-l-4 border-indigo-500" : ""
      }`}
    >
      <div className="flex items-center gap-3 px-4 py-3 cursor-pointer border-b border-gray-100 hover:bg-indigo-50 transition-all">
        <div className="relative">
          <Image
            className="w-12 h-12 rounded-xl border border-indigo-100 shadow-sm"
            alt={`${conversation.name}'s Avatar`}
            src={`/img/avatars/${avatars?.[0] ?? "user.webp"}`}
            width={48}
            height={48}
          />
          {isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h2
              className={`font-semibold truncate ${
                // isActive ? "text-indigo-700" : "text-gray-800"
                true ? "text-indigo-700" : "text-gray-800"
              }`}
            >
              {getName()}
            </h2>
            <span className="text-xs text-gray-400 whitespace-nowrap">
              {conversation.lastMessageTimestamp}
            </span>
          </div>
          <p className="text-sm text-gray-500 truncate">
            {conversation.lastMessageContent}
          </p>
        </div>
        {unreadCount > 0 && (
          <span className="bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </div>
    </li>
  );
};

export default ChatListItem;
