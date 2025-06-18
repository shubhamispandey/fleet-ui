import React from "react";
import { Check, CheckCheck, Eye } from "lucide-react";

interface ReadStatusProps {
  isSelf: boolean;
  readBy: string[];
  participants: string[];
  isGroupChat: boolean;
  currentUserId: string;
}

const ReadStatus: React.FC<ReadStatusProps> = ({
  isSelf,
  readBy,
  participants,
  isGroupChat,
  currentUserId,
}) => {
  // Don't show read status for messages sent by others
  if (!isSelf) {
    return null;
  }

  // Get other participants (excluding current user)
  const otherParticipants = participants.filter((id) => id !== currentUserId);

  // Get participants who have read the message (excluding current user)
  const participantsWhoRead = readBy.filter((id) => id !== currentUserId);

  const readCount = participantsWhoRead.length;
  const totalOtherParticipants = otherParticipants.length;

  // For private chats
  if (!isGroupChat) {
    const otherParticipant = otherParticipants[0]; // There's only one other participant
    const isRead = participantsWhoRead.includes(otherParticipant);

    return (
      <div className="flex items-center justify-end mt-1">
        {isRead ? (
          <div className="cursor-help" title="Message read by recipient">
            <Eye className="w-3 h-3 text-blue-500" />
          </div>
        ) : (
          <div className="cursor-help" title="Message delivered to recipient">
            <CheckCheck className="w-3 h-3 text-gray-400" />
          </div>
        )}
      </div>
    );
  }

  // For group chats
  if (readCount === 0) {
    // Message sent but not delivered/read by anyone
    return (
      <div className="flex items-center justify-end mt-1">
        <div className="cursor-help" title="Message sent">
          <Check className="w-3 h-3 text-gray-400" />
        </div>
      </div>
    );
  } else if (readCount < totalOtherParticipants) {
    // Message read by some but not all participants
    return (
      <div className="flex items-center justify-end mt-1">
        <div
          className="cursor-help"
          title={`Message read by ${readCount} of ${totalOtherParticipants} participants`}
        >
          <CheckCheck className="w-3 h-3 text-gray-400" />
        </div>
      </div>
    );
  } else {
    // Message read by all participants
    return (
      <div className="flex items-center justify-end mt-1">
        <div className="cursor-help" title="Message read by all participants">
          <Eye className="w-3 h-3 text-blue-500" />
        </div>
      </div>
    );
  }
};

export default ReadStatus;
