"use client";
import React from "react";
import { useRouter } from "next/navigation";

import { FaFeatherAlt } from "react-icons/fa";

const TweetBtn = () => {
  const router = useRouter();

  return (
    <div className="absolute bottom-16 right-5 flex items-start justify-center md:relative md:bottom-0 md:right-0 md:w-full lg:justify-start">
      <button
        className="my-2 hidden w-full rounded-full bg-[#1d9bf0] p-2 font-semibold text-white lg:block"
        onClick={() => router.push("/compose/tweet")}
      >
        Post
      </button>
      <button
        className="z-50 m-2 flex w-fit items-center justify-center rounded-full bg-[#1d9bf0] p-2.5 shadow-sm shadow-white lg:hidden"
        onClick={() => router.push("/compose/tweet")}
      >
        <FaFeatherAlt size={23} color="white" />
      </button>
    </div>
  );
};

export default TweetBtn;
