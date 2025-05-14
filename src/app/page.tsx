"use client";

import { useLayoutEffect } from "react";
import { redirect } from "next/navigation";
import useAuth from "@/components/auth/useAuth";
import Features from "@/components/landing/features/Features";
import Header from "@/components/landing/header/Header";
import Hero from "@/components/landing/home/Home";
import Loader from "@/components/loader/Loader";

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();

  useLayoutEffect(() => {
    if (!isLoading && isAuthenticated) {
      redirect("/auth/dashboard");
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading || isAuthenticated) return <Loader />;

  return (
    <div className="">
      <Header />
      <main>
        <Hero />
        <Features />
      </main>
    </div>
  );
}
