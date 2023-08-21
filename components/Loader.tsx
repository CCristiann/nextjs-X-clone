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
      ${isForFullPage && "fixed w-screen h-screen top-0 left-0 bg-black"}
      h-full w-full flex flex-col items-center justify-center p-10
    `}
    >
      <Spinner
        className="text-sm text-twitterBlue/40 fill-twitterBlue"
        aria-label="loader"
        size="md"
      />
      {message && (
        <p className="text-lg text-neutral-500 font-semibold my-8">{message}</p>
      )}
    </div>
  );
};

export default Loader;
