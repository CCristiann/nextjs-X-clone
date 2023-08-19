"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { BiArrowBack } from "react-icons/bi";

type HeaderProps = {
  label: string;
  showBackArrow?: boolean;
};
const Header: React.FC<HeaderProps> = ({ label, showBackArrow }) => {
  const router = useRouter();

  return (
    <div className="border-b-[1px] border-neutral-800 sticky top-0 bg-black/50 backdrop-blur-md z-50">
      <div className="flex gap-2 items-center px-3 py-3">
        {showBackArrow && (
          <BiArrowBack
            onClick={() => router.back()}
            size={20}
            color="white"
            className="cursor-pointer hover:opacity-70 transition"
          />
        )}
        <h3 className="text-white font-semibold text-xl px-2">{label}</h3>
      </div>
      {label === "Home" && (
        <div className="w-full text-white flex items-center justify-center">
          <button className="w-[50%] hover:bg-slate-400 hover:bg-opacity-10 duration-100 py-3">
            For you
          </button>
          <button className="w-[50%] hover:bg-slate-400 hover:bg-opacity-10 duration-100 py-3">
            Following
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
