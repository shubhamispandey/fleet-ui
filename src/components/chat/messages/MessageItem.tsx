import React, { useState, useRef } from "react";
import Image from "next/image";
import { MessageType, UserType } from "../../../types";
import ReadStatus from "./ReadStatus";
import Modal from "../../ui/Modal";
import DropdownMenu from "../../ui/DropdownMenu";
import MessageInfoModal from "./MessageInfoModal";
import { Delete, Edit, Info, Pin } from "lucide-react";
import useDashboard from "@hooks/useDashboard";

interface MessageProps {
  message: MessageType;
  isGroupChat?: boolean;
  currentUserId: string;
  participants: string[];
  participantData: UserType[];
}

const Message: React.FC<MessageProps> = ({
  message,
  isGroupChat = false,
  currentUserId,
  participants,
  participantData,
}) => {
  const { handleEditMessage } = useDashboard();

  const isSelf = message.senderId._id === currentUserId;
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [messageBounds, setMessageBounds] = useState({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
  });
  const [showMessageInfoModal, setShowMessageInfoModal] = useState(false);
  const textContentRef = useRef<HTMLDivElement>(null);

  const is15MinutesOld =
    new Date(message.createdAt).getTime() > Date.now() - 15 * 60 * 1000;

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (textContentRef.current) {
      const rect = textContentRef.current.getBoundingClientRect();
      setMessageBounds({
        left: rect.left,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
      });
    }
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setShowContextMenu(true);
  };

  const handleDoubleClick = () => {
    setShowMessageInfoModal(true);
  };

  const handleMessageInfo = () => {
    setShowContextMenu(false);
    setShowMessageInfoModal(true);
  };

  const contextMenuItems = [
    {
      label: "Message Info",
      icon: <Info />,
      onClick: handleMessageInfo,
    },
  ];

  if (isSelf && message.editable && is15MinutesOld) {
    contextMenuItems.push({
      label: "Edit",
      icon: <Edit />,
      onClick: () => handleEditMessage({ message }),
    });
  }

  if (isSelf && message.deletable) {
    contextMenuItems.push({
      label: "Delete",
      icon: <Delete />,
      onClick: () => {},
    });
  }

  return (
    <>
      <div
        className={`flex flex-col gap-1 ${
          isSelf ? "items-end" : "items-start"
        }`}
        onContextMenu={handleContextMenu}
        onDoubleClick={handleDoubleClick}
      >
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
          {!isSelf && isGroupChat && (
            <Image
              className="w-5 h-5 rounded-full border border-indigo-100 shadow-sm"
              alt="User Avatar"
              src={message.senderId.avatar || "/img/avatars/user.webp"}
              width={20}
              height={20}
            />
          )}
          {!isSelf && isGroupChat && (
            <span className="font-medium text-indigo-600">
              {message.senderId.name}
            </span>
          )}
          <span>{new Date(message.createdAt).toLocaleTimeString()}</span>
        </div>

        {/* Reply Preview */}
        {message.replySnapshot && (
          <div className="max-w-[85vw] md:max-w-[65vw] p-2 text-sm text-gray-600 bg-gray-100 border-l-4 border-indigo-500 rounded-t-md">
            <span className="font-medium">
              {message.replySnapshot.senderName}
            </span>
            : {message.replySnapshot.content}
          </div>
        )}

        {/* Message bubble */}
        <div
          ref={textContentRef}
          className={`relative max-w-[85vw] md:max-w-[65vw] px-4 py-3 rounded-2xl shadow-sm whitespace-pre-wrap ${
            isSelf
              ? "bg-indigo-600 text-white rounded-br-none"
              : "bg-white text-gray-800 rounded-bl-none border border-gray-100"
          }`}
        >
          {message.deletedBy ? (
            <span className="italic text-sm text-gray-400">
              This message was deleted
            </span>
          ) : (
            <>
              {message.content}
              {message.edited && (
                <span className="ml-2 text-xs italic text-gray-300">
                  (edited)
                </span>
              )}
            </>
          )}
          {message.isPinned && (
            <Pin className="absolute top-1 right-1 w-4 h-4 text-yellow-500" />
          )}
        </div>

        <ReadStatus
          isSelf={isSelf}
          readBy={message.readBy}
          participants={participants}
          isGroupChat={isGroupChat}
          currentUserId={currentUserId}
        />
      </div>

      {/* Context Menu */}
      <DropdownMenu
        isOpen={showContextMenu}
        onClose={() => setShowContextMenu(false)}
        position={contextMenuPosition}
        items={contextMenuItems}
        align="center"
        size="md"
        messageBounds={messageBounds}
      />

      {/* Message Info Modal */}
      <Modal
        isOpen={showMessageInfoModal}
        onClose={() => setShowMessageInfoModal(false)}
        title="Message Information"
        size="lg"
      >
        <MessageInfoModal
          message={message}
          participants={participants}
          participantData={participantData}
          currentUserId={currentUserId}
          isGroupChat={isGroupChat}
        />
      </Modal>
    </>
  );
};

export default Message;
