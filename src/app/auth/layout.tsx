"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthHook from "@/hooks/useAuth";
import useAuth from "@/components/auth/useAuth";
import Loader from "@/components/loader/Loader";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const { getUser } = useAuthHook();

  useEffect(() => {
    if (!isLoading && isAuthenticated) getUser(router.push);
  }, [isLoading, isAuthenticated, getUser]);

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (!isLoading && !isAuthenticated) {
    if (typeof window !== "undefined") {
      router.push("/login");
    }
    return null;
  }

  return <div>{children}</div>;
};

export default Layout;
