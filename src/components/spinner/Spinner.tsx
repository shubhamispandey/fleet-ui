import React from "react";

type SpinnerType = "circle" | "dots" | "3d";

interface SpinnerProps {
  type?: SpinnerType;
  label?: string;
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  type = "circle",
  label,
  className = "",
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {type === "circle" && (
        <span className="relative flex h-12 w-12">
          <span className="animate-spin absolute inline-flex h-full w-full rounded-full bg-gradient-to-tr from-blue-400 via-purple-500 to-pink-500 opacity-30"></span>
          <span className="relative inline-flex rounded-full h-12 w-12 border-4 border-t-transparent border-b-transparent border-blue-500 animate-spin"></span>
        </span>
      )}
      {type === "dots" && (
        <span className="flex space-x-2 mt-2">
          <span className="h-3 w-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="h-3 w-3 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="h-3 w-3 bg-pink-500 rounded-full animate-bounce"></span>
        </span>
      )}
      {type === "3d" && (
        <span className="relative flex h-12 w-12 items-center justify-center">
          <span className="absolute h-10 w-10 border-4 border-blue-400 border-t-transparent border-b-transparent rounded-full animate-spin"></span>
          <span className="absolute h-8 w-8 border-4 border-purple-400 border-l-transparent border-r-transparent rounded-full animate-spin [animation-direction:reverse]"></span>
          <span className="absolute h-6 w-6 border-4 border-pink-400 border-t-transparent border-b-transparent rounded-full animate-spin"></span>
        </span>
      )}
      {label && (
        <span className="mt-4 text-sm text-gray-600 font-medium animate-fade-in">
          {label}
        </span>
      )}
    </div>
  );
};

export default Spinner;
