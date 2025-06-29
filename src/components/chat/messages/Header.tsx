import React from "react";
import Image from "next/image";
import { Phone, Video, MoreVertical, Circle } from "lucide-react";
import useDashboard from "@hooks/useDashboard";

const ChatHeader = () => {
  const { recipientUsers, recipient } = useDashboard();

  if (!recipient) return null;
  const isOnline = recipient.status === "online";
  return (
    <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
      <div className="relative">
        <Image
          src={`/img/avatars/${recipient.avatar ?? "user.webp"}`}
          alt="Chat User"
          width={48}
          height={48}
          className="w-12 h-12 rounded-xl border border-indigo-100 shadow-sm"
        />
        {recipient.status === "online" && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        )}
      </div>
      <div>
        <h2 className="font-bold text-gray-800">{recipient.name}</h2>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-500">
            {isOnline ? "Online" : "Offline"}
          </span>
          <Circle size={6} className="text-gray-400" />
          <span className="text-xs text-gray-500">
            {recipientUsers.length} members
          </span>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600">
          <Phone size={20} />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600">
          <Video size={20} />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600">
          <MoreVertical size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
