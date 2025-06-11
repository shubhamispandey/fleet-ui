import React from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Conversation } from "../../../types";
import useDashboard from "@hooks/useDashboard";

interface ConversationItemProps {
  conversation: Conversation;
}

const ConversationListItem: React.FC<ConversationItemProps> = ({
  conversation,
}) => {
  const { selectedConversation, currentUser, handleSelectConversation } =
    useDashboard();
  const isActive = selectedConversation.data?._id === conversation._id;

  // Local logic separated from JSX
  const participants = conversation.participants.filter(
    (p) => currentUser && p._id !== currentUser._id
  );
  const isOnline = participants.some((p) => p.status === "online");
  const avatars = participants.map((p) => p.avatar);
  const displayName =
    conversation.type === "group"
      ? conversation.name || "Group Chat"
      : participants?.[0]?.name || "Unknown User";

  const lastMessageSenderName =
    conversation.lastMessage?.senderId._id === currentUser?._id
      ? "You"
      : conversation.lastMessage?.senderId.name;
  const lastMessageContent = conversation.lastMessage?.content || "";
  const lastMessageTime = conversation.lastMessage?.createdAt
    ? formatDistanceToNow(new Date(conversation.lastMessage.createdAt), {
        addSuffix: true,
      })
    : "";

  // const unreadCount = currentUser?._id
  //   ? conversation.lastMessage?.readBy?.includes(currentUser?._id)
  //     ? 0
  //     : 1
  //   : 0;

  return (
    <li
      className={`relative transition-all ${
        isActive ? "bg-indigo-50 border-l-4 border-indigo-500" : ""
      }`}
      onClick={() => handleSelectConversation({ conversation })}
    >
      <div className="flex items-center gap-3 px-4 py-3 cursor-pointer border-b border-gray-100 hover:bg-indigo-50 transition-all">
        <div className="relative">
          <Image
            className="w-12 h-12 rounded-xl border border-indigo-100 shadow-sm"
            alt={`${displayName}'s Avatar`}
            src={`/img/avatars/${avatars?.[0] ?? "user.webp"}`}
            width={48}
            height={48}
          />
          {isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h2
              className={`font-semibold truncate ${
                isActive ? "text-indigo-700" : "text-gray-800"
              }`}
            >
              {displayName}
            </h2>
            <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
              {lastMessageTime}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500 truncate">
              {lastMessageSenderName}: {lastMessageContent}
            </p>
            {/* {unreadCount > 0 && (
              <span className="ml-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )} */}
          </div>
        </div>
      </div>
    </li>
  );
};

export default ConversationListItem;
