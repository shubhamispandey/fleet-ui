import React from "react";
import { useSelector } from "react-redux";
import ChatListItem from "./ListItem";
import { RootState } from "@redux/store";

const ChatList: React.FC = ({}) => {
  const conversations = useSelector(
    (state: RootState) => state.conversations.allConversations
  );
  console.log("Conversations from Redux:", conversations);
  return (
    <ul className="py-2">
      {conversations.data.conversations.map((conversation) => (
        <ChatListItem key={conversation._id} conversation={conversation} />
      ))}
    </ul>
  );
};

export default ChatList;
