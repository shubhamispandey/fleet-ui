import React from "react";
import ChatListItem from "./ListItem";
import { Chat } from "./types";

interface ChatListProps {
  chats: Chat[];
  activeChat: string | null;
  setActiveChat: (id: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({
  chats,
  activeChat,
  setActiveChat,
}) => {
  return (
    <ul className="py-2">
      {chats.map((chat) => (
        <ChatListItem
          key={chat.id}
          chat={chat}
          isActive={activeChat === chat.id}
          onClick={() => setActiveChat(chat.id)}
        />
      ))}
    </ul>
  );
};

export default ChatList;
