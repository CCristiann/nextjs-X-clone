"use client";
import React from "react";
import { useRouter } from "next/navigation";

import { FaFeatherAlt } from "react-icons/fa";

const TweetBtn = () => {
  const router = useRouter();

  return (
    <div className="absolute md:w-full bottom-16 right-5 md:relative md:bottom-0 md:right-0 flex items-start justify-center lg:justify-start">
      <button
        className="text-white bg-[#1d9bf0] rounded-full p-2 w-full my-2 font-semibold hidden lg:block"
        onClick={() => router.push("/compose/tweet")}
      >
        Post
      </button>
      <button
        className="z-50 shadow-sm shadow-white bg-[#1d9bf0] rounded-full p-2.5 m-2 flex items-center justify-center w-fit lg:hidden"
        onClick={() => router.push("/compose/tweet")}
      >
        <FaFeatherAlt size={23} color="white" />
      </button>
    </div>
  );
};

export default TweetBtn;
