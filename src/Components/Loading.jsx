import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-t-primary border-b-primary border-l-gray-200 border-r-gray-200 rounded-full animate-spin"></div>
        <p className="text-primary font-semibold text-lg">Loading...</p>
      </div>

      <p className="mt-4 text-center text-gray-500 max-w-xs">
        Please wait while we load your content.
      </p>
    </div>
  );
};

export default Loading;
