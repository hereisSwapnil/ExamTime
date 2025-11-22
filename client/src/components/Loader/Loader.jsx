import React from "react";
import { ThreeCircles } from "react-loader-spinner";

export const Loader = () => {
  return (
    <div className="h-[95vh] w-full flex flex-col justify-center items-center bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      <ThreeCircles
        visible={true}
        height="80"
        width="80"
        color="#6366f1"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperclassName=""
      />
      <p className="mt-4 text-gray-600 font-medium">Loading...</p>
    </div>
  );
};

// Inline button loader component
export const ButtonLoader = ({ size = "small" }) => {
  const sizeClasses = {
    small: "h-4 w-4",
    medium: "h-5 w-5",
    large: "h-6 w-6"
  };

  return (
    <svg
      className={`animate-spin ${sizeClasses[size]} text-white`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

// Skeleton loader component
export const SkeletonLoader = ({ className = "" }) => {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
  );
};
