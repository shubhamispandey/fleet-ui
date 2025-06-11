import React from "react";
import { useSelector } from "react-redux";
import ConversationListItem from "./ConversationListItem";
import { RootState } from "@redux/store";

const ConversationList: React.FC = ({}) => {
  const conversations = useSelector(
    (state: RootState) => state.conversations.allConversations
  );

  return (
    <ul className="py-2">
      {conversations.data.conversations.map((conversation) => (
        <ConversationListItem
          key={conversation._id}
          conversation={conversation}
        />
      ))}
    </ul>
  );
};

export default ConversationList;
