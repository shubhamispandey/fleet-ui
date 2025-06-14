import React, { useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Participant {
  _id: string;
  name: string;
  avatar?: string;
}

interface TypingIndicatorProps {
  typing?: Record<string, boolean>;
  participants?: Participant[];
  currentUserId?: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  typing,
  participants = [],
  currentUserId,
}) => {
  const typingUsersData = useMemo(() => {
    if (!typing || Object.keys(typing).length === 0) return [];
    const typingUserIds = Object.keys(typing);
    return typingUserIds
      .filter((userId) => typing[userId] === true && userId !== currentUserId)
      .map((userId) =>
        participants.find((participant) => participant._id === userId)
      )
      .filter((user): user is Participant => !!user);
  }, [typing, participants, currentUserId]);

  if (!typingUsersData.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex items-center gap-3 px-3 py-2 ml-4 mb-2 bg-transparent"
    >
      {/* Avatar Stack with Staggered Animation */}
      <motion.div
        className="flex -space-x-1.5"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
      >
        {typingUsersData.slice(0, 3).map((user, index) => (
          <motion.div
            key={user._id}
            initial={{ y: 20, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{
              duration: 0.3,
              delay: 0.2 + index * 0.1,
              ease: "easeOut",
            }}
            className={`relative w-8 h-8 rounded-full ${
              index === 0 ? "z-30" : index === 1 ? "z-20" : "z-10"
            }`}
          >
            <Image
              src={`/img/avatars/${user.avatar ?? "user.webp"}`}
              alt={`${user.name} avatar`}
              width={32}
              height={32}
              className="w-full h-full rounded-full object-cover"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full"></div>
          </motion.div>
        ))}
        {typingUsersData.length > 3 && (
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5, ease: "easeOut" }}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-400 dark:bg-gray-600 ring-2 ring-white dark:ring-gray-800 text-xs font-medium text-white z-10"
          >
            +{typingUsersData.length - 3}
          </motion.div>
        )}
      </motion.div>
      {/* Typing Text and Dots with Left Slide Animation */}
      <motion.div
        className="flex items-center gap-3"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
      >
        {/* Animated Typing Dots */}
        <motion.div
          className="flex gap-1"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.8, ease: "easeOut" }}
        >
          <div
            className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
            style={{ animationDelay: "200ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
            style={{ animationDelay: "400ms" }}
          ></div>
        </motion.div>
        <motion.span
          className="text-sm text-gray-500 dark:text-gray-400 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1.0 }}
        >
          {typingUsersData.length === 1
            ? `${typingUsersData[0]?.name || "Someone"} is typing`
            : typingUsersData.length === 2
            ? `${typingUsersData[0]?.name || "Someone"} and ${
                typingUsersData[1]?.name || "Someone"
              } are typing`
            : typingUsersData.length === 3
            ? `${typingUsersData[0]?.name || "Someone"}, ${
                typingUsersData[1]?.name || "Someone"
              } and ${typingUsersData[2]?.name || "Someone"} are typing`
            : `${typingUsersData[0]?.name || "Someone"} and ${
                typingUsersData.length - 1
              } others are typing`}
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default TypingIndicator;
