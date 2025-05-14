"use client";

import React, { memo } from "react";
import Image from "next/image";
import Input from "@/components/input/Input";

// Memoize UserChatType to avoid unnecessary re-renders
const UserChatType = memo(
  ({
    chat,
    time,
    icon,
    type = "self",
  }: {
    chat: string;
    time: string;
    icon: string;
    type: "self" | "user";
  }) => {
    return (
      <div
        className={`flex flex-col gap-2 ${
          type === "self" ? "items-end mr-2" : "ml-2"
        }`}
      >
        <div className="text-slate-500 text-[14px] flex gap-2 items-center">
          {time} <i className="lni lni-comments"></i>
        </div>
        <div className="flex items-center gap-2">
          {type === "user" && (
            <Image
              className="w-10 h-10 rounded-full overflow-hidden bg-white border-2"
              alt="User Avatar"
              src={icon}
              width={40} // Reduced image size for optimization
              height={40}
            />
          )}
          <div
            className={`${
              type === "user" ? "bg-indigo-50" : "bg-green-50"
            } text-slate-900 p-3 rounded-lg`}
          >
            {chat}
          </div>
        </div>
      </div>
    );
  }
);

const ChatListItem = ({
  name,
  imgSrc,
  time,
  reverseIcon,
}: {
  name: string;
  imgSrc: string;
  time: string;
  reverseIcon?: boolean;
}) => (
  <li className="relative">
    <div className="py-3 px-5 flex items-center gap-2 cursor-pointer border-b-2">
      <Image
        className="w-11 h-11 rounded-full overflow-hidden bg-white border-2"
        alt={`${name}'s Avatar`}
        src={imgSrc}
        width={40} // Reduced image size for optimization
        height={40}
      />
      <h2>{name}</h2>
    </div>
    <div className="absolute top-2 right-2 text-[12px] text-slate-400">
      {time}
    </div>
    <div className={`absolute bottom-2 right-2 text-[12px] text-slate-400`}>
      <i
        className={`lni lni-arrow-top-left ${reverseIcon ? "scale-[-1]" : ""}`}
      ></i>
    </div>
  </li>
);

const Dashboard = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-64px)] flex-1">
      <div className="basis-60 bg-white border-r-2 border-slate-200 h-full">
        <ul>
          <ChatListItem
            name="Lessie Allaxendra"
            imgSrc="/img/avatars/g1.webp"
            time="2h"
          />
          <ChatListItem
            name="Alex Zhandar"
            imgSrc="/img/avatars/b7.webp"
            time="1d"
            reverseIcon={true}
          />
        </ul>
      </div>
      <div className="flex-1 p-2 relative h-full">
        <div className="overflow-y-auto h-[calc(100vh-140px)]">
          {[1, 2, 3, 4, 5].map((el) => (
            <div key={el}>
              <UserChatType
                chat="Hi Brad! I am looking forward to meeting you!"
                icon="/img/avatars/g2.webp"
                time="10:33 am"
                type="user"
              />
              <UserChatType
                chat="Sure we'll connect tomorrow with you"
                icon=""
                time="11:51 am"
                type="self"
              />
            </div>
          ))}
        </div>
        <div className="absolute bottom-2 right-0 w-full p-2">
          <Input
            id="sendMessage"
            placeholder="Send messages ..."
            inputStyle={{ height: "45px" }}
          />
          <div className="absolute bottom-4 right-6 text-slate-400">
            <i className="lni lni-arrow-top-right"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
