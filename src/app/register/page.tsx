// app/login/page.tsx

"use client";

import { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import UseAuth from "@/hooks/useAuth";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import useAuth from "@/components/auth/useAuth";
import Loader from "@/components/loader/Loader";
import { RegisterParams } from "@/types";
import AvatarSelector from "@/components/avatarSelector/Avatar";

export default function RegisterPage() {
  const [userData, setUserData] = useState<RegisterParams>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "user.webp",
  });

  const { isAuthenticated, isLoading } = useAuth();
  const { register } = UseAuth();
  const router = useRouter();

  const authState = useSelector((state) => (state as any).auth.register);

  useLayoutEffect(() => {
    if (!isLoading && isAuthenticated) redirect("/auth/dashboard");
  }, [isAuthenticated, isLoading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    setUserData((prev: RegisterParams) => {
      const temp = { ...prev };
      temp[id as keyof RegisterParams] = value;
      return temp;
    });
  };

  if (isLoading || isAuthenticated) return <Loader />;

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-10 lg:px-8 bg-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto h-10 w-auto"
          src="/img/landing/logo/logo-color-square.svg" // Replace with your logo path
          alt="Your Company"
          width={40}
          height={40}
        />
        <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register your account
        </h2>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-2" action="#" method="POST">
          <div>
            <AvatarSelector
              selectedAvatar={userData.avatar}
              setSelectedAvatar={(avatar) => {
                setUserData((prev) => {
                  return { ...prev, avatar };
                });
              }}
            />
          </div>
          <Input
            id="name"
            label="Full Name"
            type="text"
            value={userData.name}
            onChange={handleChange}
          />
          <Input
            id="email"
            label="Email address"
            type="email"
            value={userData.email}
            onChange={handleChange}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            value={userData.password}
            onChange={handleChange}
          />
          <Input
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            value={userData.confirmPassword}
            onChange={handleChange}
          />

          <div>
            <Button
              kind="primary"
              label="Register"
              className="mt-4"
              fullWidth={true}
              loading={(authState as any).loading}
              onClick={() => register(userData, router.push)}
            />
          </div>
        </form>

        {/* Or in center arround dashed line */}

        <div className="relative w-full border-t-2 border-dashed my-8 after:content-['OR'] after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-slate-800 after:bg-white after:p-2"></div>

        <div className="mt-6">
          <Button
            kind="secondary"
            loading={false}
            iconLeft={
              <Image
                src="/img/landing/logo/google.webp"
                alt="Google"
                width={25}
                height={25}
                className="mr-2"
              />
            }
            label="Register with Google"
            className="mt-4"
            fullWidth={true}
          />
        </div>

        <p className="mt-4 text-center text-sm text-gray-500">
          Already a member?{" "}
          <Link
            href="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login with your account
          </Link>
        </p>
      </div>
    </div>
  );
}
