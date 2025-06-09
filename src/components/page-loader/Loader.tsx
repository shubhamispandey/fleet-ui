import React from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";

const PageLoader: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-indigo-50 bg-opacity-90 z-50">
      <div className="flex flex-col items-center justify-center relative z-10">
        <div className="relative flex items-center justify-center mb-6">
          {/* Loader ring */}
          <span className="inline-flex items-center justify-center rounded-full p-2 animate-spin bg-gradient-to-tr from-indigo-400 via-purple-500 to-indigo-600">
            <Loader2
              className="text-transparent bg-clip-text bg-gradient-to-tr from-indigo-400 via-purple-500 to-indigo-600"
              size={96}
              strokeWidth={2.5}
            />
          </span>
          {/* Purple blurred circle behind logo */}
          <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="absolute w-[110px] h-[110px] rounded-full bg-purple-400 opacity-40 blur-2xl" />
            {/* Fleet Logo in the center, above purple circle */}
            <span className="relative flex items-center justify-center">
              <Image
                src="/img/landing/logo/logo-white-square.svg"
                alt="Fleet Logo"
                width={64}
                height={64}
                className="drop-shadow-lg"
                priority
              />
            </span>
          </span>
        </div>
        <span className="text-indigo-700 font-bold text-2xl tracking-wide mb-1 relative">
          <span className="animate-typing overflow-hidden whitespace-nowrap border-r-2 border-indigo-700 pr-2">
            Loading Fleet...
          </span>
        </span>
        <span className="text-slate-600 text-base font-medium">
          Setting sail for your next meeting!
        </span>
      </div>
    </div>
  );
};

export default PageLoader;
