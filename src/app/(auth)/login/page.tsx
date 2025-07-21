"use client";

import { ChangeEvent, useLayoutEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
// import { signIn } from "next-auth/react";

import Button from "@components/button/Button";
import Input from "@components/input/Input";
import useAuth from "@components/auth/useAuth";
import useAuthHook from "@hooks/useAuth";
import { LoginParams } from "../../../types";
import Loader from "@components/page-loader/Loader";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";

export default function LoginPage() {
  // const [userData, setUserData] = useState<LoginParams>({
  //   email: "shubhampandeyhaihum@gmail.com",
  //   password: "Shubham#057",
  // });
  const [userData, setUserData] = useState<LoginParams>({
    email: "",
    password: "",
  });
  const router = useRouter();
  const { login } = useAuthHook();
  const { isAuthenticated, isLoading } = useAuth();
  const isLoggingIn = useSelector(
    (state: RootState) => state.auth.login.loading
  );

  useLayoutEffect(() => {
    if (!isLoading && isAuthenticated) {
      redirect("/dashboard");
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading || isAuthenticated) return <Loader />;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setUserData({ ...userData, [id]: value });
  };

  const handleLogin = () => {
    login(userData, router.push);
  };

  const populateAccount = (email: string) => {
    setUserData({
      email,
      password: "admin",
    });
  };

  return (
    <div className="flex min-h-lvh flex-col justify-center px-6 py-12 lg:px-8 bg-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto h-10 w-auto"
          src="/img/landing/logo/logo-color-square.svg" // Replace with your logo path
          alt="Your Company"
          width={40}
          height={40}
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Login to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {/* Test Account Information */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">
            Test Accounts
          </h3>
          <div className="text-xs text-blue-700 space-y-2">
            <div className="flex items-center justify-between">
              <span>
                <strong>John Doe:</strong> john_doe@gmail.com / admin
              </span>
              <button
                onClick={() => populateAccount("john_doe@gmail.com")}
                className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
              >
                Use
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span>
                <strong>Jane Doe:</strong> jane_doe@gmail.com / admin
              </span>
              <button
                onClick={() => populateAccount("jane_doe@gmail.com")}
                className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
              >
                Use
              </button>
            </div>
          </div>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <Input
              id="email"
              label="Email address"
              type="email"
              onChange={handleInputChange}
              value={userData.email}
            />
            <div className="text-sm text-right mt-2">
              <Link
                className="font-semibold text-indigo-600 hover:text-indigo-500"
                href="/forgot-password"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              label="Password"
              type="password"
              onChange={handleInputChange}
              value={userData.password}
            />
          </div>

          <div>
            <Button
              kind="primary"
              label="Login"
              className="mt-4"
              fullWidth={true}
              loading={isLoggingIn}
              onClick={handleLogin}
            />
          </div>
        </form>

        <div className="relative w-full border-t-2 border-dashed my-8 after:content-['OR'] after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-slate-800 after:bg-white after:p-2"></div>

        {/* <div className="mt-6">
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
            onClick={() => signIn("google")}
            label="Login with Google"
            className="mt-4"
            fullWidth={true}
          />
        </div> */}

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            href="/register"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Register with your account
          </Link>
        </p>
      </div>
    </div>
  );
}
