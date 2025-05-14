"use client";

import { useState, useRef, useLayoutEffect } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/button/Button";
import UseAuth from "@/hooks/useAuth";
import useAuth from "@/components/auth/useAuth";
import Loader from "@/components/loader/Loader";

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [otpError, setOtpError] = useState<string | null>(null);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]); // Refs for the inputs
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get("email");
  const { verifyOtp } = UseAuth();

  const { isAuthenticated, isLoading } = useAuth();

  useLayoutEffect(() => {
    if (!isLoading && isAuthenticated) {
      redirect("/auth/dashboard");
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading || isAuthenticated) return <Loader />;

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Ensure only one character per box

    // Move focus to the next input if one character is entered
    if (value && index < otpRefs.current.length - 1) {
      otpRefs.current[index + 1]?.focus();
      otpRefs.current[index + 1]?.select();
    }

    setOtp(newOtp);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = e.clipboardData.getData("text");
    if (pastedData.length === 6) {
      const newOtp = pastedData.split("").slice(0, 6); // Take only first 6 digits
      setOtp(newOtp);

      // Populate the fields and move focus to the last one
      newOtp.forEach((value, index) => {
        if (otpRefs.current[index]) {
          otpRefs.current[index]!.value = value;
        }
      });
      otpRefs.current[5]?.focus(); // Focus last input
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setOtpError("Please enter a valid 6-digit OTP.");
      return;
    }

    verifyOtp({ email: email as string, otp: otpString }, router.push);
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-10 lg:px-8 bg-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Verify OTP
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter the 6-digit OTP sent to your email: <strong>{email}</strong>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleVerifyOtp();
          }}
        >
          <div className="grid grid-cols-6 gap-2">
            {otp.map((_, index) => (
              <input
                key={index}
                ref={(el: any) => (otpRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={otp[index]}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={index === 0 ? handlePaste : undefined} // Only allow pasting in the first input
                className="text-center text-slate-800 h-12 w-full rounded border border-gray-400 focus-visible:outline-indigo-500 text-lg"
              />
            ))}
          </div>

          {otpError && <p className="text-red-500 text-sm">{otpError}</p>}

          <Button
            kind="primary"
            label="Verify OTP"
            className="mt-4"
            fullWidth={true}
            onClick={handleVerifyOtp}
          />
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Didn't receive the OTP?{" "}
            <button className="font-semibold text-indigo-600 hover:text-indigo-500">
              Resend OTP
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
