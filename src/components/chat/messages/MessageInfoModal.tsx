import React from "react";
import Image from "next/image";
import { MessageType, UserType } from "../../../types";
import { CheckCheck, Eye, Clock, Users, Calendar, User } from "lucide-react";

interface MessageInfoModalProps {
  message: MessageType;
  participants: string[];
  participantData: UserType[];
  currentUserId: string;
  isGroupChat: boolean;
}

const MessageInfoModal: React.FC<MessageInfoModalProps> = ({
  message,
  participants,
  participantData,
  currentUserId,
  isGroupChat,
}) => {
  // Get other participants (excluding current user)
  const otherParticipants = participants.filter((id) => id !== currentUserId);

  // Get participants who have read the message (excluding current user)
  const participantsWhoRead = message.readBy.filter(
    (id) => id !== currentUserId
  );

  // Get participants who haven't read the message
  const participantsNotRead = otherParticipants.filter(
    (id) => !participantsWhoRead.includes(id)
  );

  // Find participant names from participantData
  const getParticipantName = (participantId: string) => {
    const participant = participantData.find((p) => p._id === participantId);
    return participant ? participant.name : `User ${participantId.slice(-4)}`;
  };

  const getParticipantAvatar = (participantId: string) => {
    const participant = participantData.find((p) => p._id === participantId);
    return participant?.avatar
      ? `/img/avatars/${participant.avatar}`
      : "/img/avatars/user.webp";
  };

  const isSelf = message.senderId._id === currentUserId;

  return (
    <div className="space-y-6">
      {/* Message Content */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Image
            className="w-10 h-10 rounded-full border border-gray-200"
            alt="Sender Avatar"
            src={`/img/avatars/${message.senderId.avatar || "user.webp"}`}
            width={40}
            height={40}
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-gray-900">
                {isSelf ? "You" : message.senderId.name}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(message.createdAt).toLocaleString()}
              </span>
            </div>
            <div className="text-gray-800 bg-white rounded-lg p-3 border border-gray-200">
              {message.content}
            </div>
          </div>
        </div>
      </div>

      {/* Message Details */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>
            Sent on {new Date(message.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>At {new Date(message.createdAt).toLocaleTimeString()}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <User className="w-4 h-4" />
          <span>Message type: {message.type}</span>
        </div>
      </div>

      {/* Read Status */}
      <div className="border-t border-gray-200 pt-4">
        <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
          <Users className="w-4 h-4" />
          Message Status
        </h3>

        {isGroupChat ? (
          <div className="space-y-4">
            {/* Participants who have read */}
            {participantsWhoRead.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-green-600 mb-3">
                  <Eye className="w-4 h-4" />
                  Read by ({participantsWhoRead.length})
                </div>
                <div className="space-y-2">
                  {participantsWhoRead.map((participantId) => (
                    <div
                      key={participantId}
                      className="flex items-center gap-3 p-2 bg-green-50 rounded-lg"
                    >
                      <Image
                        className="w-8 h-8 rounded-full border border-green-200"
                        alt="Participant Avatar"
                        src={getParticipantAvatar(participantId)}
                        width={32}
                        height={32}
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {getParticipantName(participantId)}
                        </div>
                        <div className="text-xs text-green-600">Read</div>
                      </div>
                      <Eye className="w-4 h-4 text-green-600" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Participants who haven't read */}
            {participantsNotRead.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-3">
                  <Clock className="w-4 h-4" />
                  Not read yet ({participantsNotRead.length})
                </div>
                <div className="space-y-2">
                  {participantsNotRead.map((participantId) => (
                    <div
                      key={participantId}
                      className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
                    >
                      <Image
                        className="w-8 h-8 rounded-full border border-gray-200"
                        alt="Participant Avatar"
                        src={getParticipantAvatar(participantId)}
                        width={32}
                        height={32}
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {getParticipantName(participantId)}
                        </div>
                        <div className="text-xs text-gray-500">Not read</div>
                      </div>
                      <CheckCheck className="w-4 h-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Image
              className="w-8 h-8 rounded-full border border-gray-200"
              alt="Recipient Avatar"
              src={getParticipantAvatar(otherParticipants[0])}
              width={32}
              height={32}
            />
            <div className="flex-1">
              <div className="font-medium text-gray-900">
                {getParticipantName(otherParticipants[0])}
              </div>
              <div className="text-xs text-gray-500">
                {participantsWhoRead.length > 0 ? "Read" : "Delivered"}
              </div>
            </div>
            {participantsWhoRead.length > 0 ? (
              <Eye className="w-4 h-4 text-green-600" />
            ) : (
              <CheckCheck className="w-4 h-4 text-gray-400" />
            )}
          </div>
        )}

        {/* Summary */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-blue-700">
            <Users className="w-4 h-4" />
            <span>
              {participantsWhoRead.length} of {otherParticipants.length}{" "}
              participants have read this message
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageInfoModal;
