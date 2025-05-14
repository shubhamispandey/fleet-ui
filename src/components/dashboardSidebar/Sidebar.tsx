"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import io from "socket.io-client";

import Button from "../button/Button";
import useMeet from "@/hooks/useMeet";

interface SidebarItem {
  href: string;
  label: string;
  icon: string;
}

const Sidebar: React.FC = () => {
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const authState = useTypedSelector((state) => state.auth.login.data);
  // const socket = io(process.env.NEXTAUTH_URL);
  const pathname = usePathname();
  const router = useRouter();

  const { handleStartMeeting } = useMeet();

  const sidebarItems: SidebarItem[] = [
    { href: "/auth/dashboard", label: "Chats", icon: "comments" },
    { href: "/auth/dashboard/people", label: "People", icon: "user" },
    { href: "/auth/dashboard/settings", label: "Settings", icon: "cog" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div className="basis-[200px] bg-white border-r-2 border-slate-100">
      <ul className="h-full flex flex-col">
        {sidebarItems.map((item) => (
          <li
            key={item.href}
            className={`${
              isActive(item.href)
                ? "border-l-4 border-primary bg-indigo-50"
                : ""
            }`}
          >
            <Link
              href={item.href}
              className="flex h-full w-full p-3 items-center gap-2"
            >
              <i
                className={`lni lni-${item.icon} `}
                style={{
                  fontSize: "20px",
                }}
              ></i>
              <span className="text-black text-sm">{item.label}</span>
            </Link>
          </li>
        ))}
        <li className="mt-auto mb-4">
          <Button
            kind="secondary"
            className="max-w-[190px] w-36 mx-auto mb-3"
            icon={
              <i
                className="lni lni-comments-alt-2"
                style={{ fontSize: "25px" }}
              ></i>
            }
            label="Join Meet"
          />
          <Button
            className="max-w-[190px] w-36 mx-auto"
            icon={
              <i className="lni lni-video" style={{ fontSize: "25px" }}></i>
            }
            onClick={() =>
              handleStartMeeting({ email: (authState as any)?.email })
            }
            label="Instant Meet"
          />
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
