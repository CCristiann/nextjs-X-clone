"use client";

import React from "react";

import { Spinner } from "flowbite-react";

type LoaderProps = {
  message?: string;
  isForFullPage?: boolean;
};
const Loader: React.FC<LoaderProps> = ({ message, isForFullPage }) => {
  return (
    <div
      className={`
      ${isForFullPage && "fixed left-0 top-0 h-screen w-screen bg-black"}
      flex h-full w-full flex-col items-center justify-center p-10
    `}
    >
      <Spinner
        className="fill-twitterBlue text-sm text-twitterBlue/40"
        aria-label="loader"
        size="md"
      />
      {message && (
        <p className="my-8 text-lg font-semibold text-neutral-500">{message}</p>
      )}
    </div>
  );
};

export default Loader;
