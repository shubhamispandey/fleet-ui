"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@components/auth/useAuth";
import Loader from "@components/page-loader/Loader";
import SocketManager from "@components/socket-manager/SocketManager";
import useUser from "@hooks/useUser";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const { getCurrentUser } = useUser();

  useEffect(() => {
    if (!isLoading && isAuthenticated) getCurrentUser(router.push);
  }, [isLoading, isAuthenticated, getCurrentUser, router.push]);

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (!isLoading && !isAuthenticated) {
    if (typeof window !== "undefined") {
      console.log(!isLoading, !isAuthenticated);
      // router.push("/login");
    }
    return null;
  }

  return (
    <div>
      <SocketManager />
      {children}
    </div>
  );
};

export default Layout;
