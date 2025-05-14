import React, { useState, useEffect } from "react";

const Loader: React.FC = () => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[5e69ff] text-white`}
    >
      <div className="flex items-center justify-center">
        <div className="loader animate-spin rounded-full border-t-4 border-b-4 border-gray-200 h-8 w-8"></div>
        <span className="ml-4">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
