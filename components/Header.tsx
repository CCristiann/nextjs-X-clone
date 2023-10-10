"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import Menu from "./menu/Menu";
import MenuItem from "./menu/MenuItem";

import { BiArrowBack } from "react-icons/bi";
import { Session } from "next-auth";
import TwitterX from "./TwitterX";

type HeaderProps = {
  label: string;
  showBackArrow?: boolean;
  session?: Session;
};
const Header: React.FC<HeaderProps> = ({ label, showBackArrow, session }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 border-b-[1px] border-neutral-800 bg-black/50 backdrop-blur-md">
      <div
        className={`
        ${label === "Home" && "justify-start"}
        relative flex items-center gap-2 px-3 py-3
      `}
      >
        {showBackArrow && (
          <BiArrowBack
            onClick={() => router.back()}
            size={20}
            color="white"
            className="cursor-pointer transition hover:opacity-70"
          />
        )}
        {label === "Home" && session ? (
          <>
            <div className="block px-1 md:hidden">
              <img
                src={session.user.image}
                className="h-10 w-10 rounded-full md:hidden"
                alt="profile image"
                onClick={() => setIsOpen(true)}
              />
            </div>
            <div className="absolute left-[50%] translate-x-[-50%] md:hidden">
              <TwitterX color="lightGray" size="xs" />
            </div>

            <h3 className="hidden text-xl font-semibold text-white md:block">
              {label}
            </h3>

            <Menu
              setIsOpen={() => setIsOpen(!isOpen)}
              isOpen={isOpen}
              headerMenu
            >
              <MenuItem
                label="Add an existing account"
                color="lightGray"
                onClick={() => {}}
              />
              <MenuItem
                label={`Log out @${session.user.username}`}
                color="lightGray"
                onClick={() => router.push("/logout")}
              />
            </Menu>
          </>
        ) : (
          <h3 className="px-2 text-xl font-semibold text-white">{label}</h3>
        )}
      </div>
      {label === "Home" && (
        <div className="flex w-full items-center justify-center text-sm text-white">
          <button className="w-[50%] py-3 duration-100 hover:bg-slate-400 hover:bg-opacity-10">
            For you
          </button>
          <button className="w-[50%] py-3 duration-100 hover:bg-slate-400 hover:bg-opacity-10">
            Following
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
