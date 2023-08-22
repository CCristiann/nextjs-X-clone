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
  session?: Session
};
const Header: React.FC<HeaderProps> = ({ label, showBackArrow, session }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b-[1px] border-neutral-800 sticky top-0 bg-black/50 backdrop-blur-md z-50">
      <div className={`
        ${label === 'Home' && 'justify-start'}
        flex gap-2 items-center px-3 py-3 relative
      `}
      >
      {showBackArrow && (
        <BiArrowBack
          onClick={() => router.back()}
          size={20}
          color="white"
          className="cursor-pointer hover:opacity-70 transition"
        />
      )}
      {label === 'Home' && session ? (
        <>
        <div className="px-1">
          <img 
          src={session.user.image} 
          className="w-10 h-10 rounded-full md:hidden"
          alt="profile image"
          onClick={() => setIsOpen(true)}
          />

        </div>
        <div className="absolute left-[50%] translate-x-[-50%] md:hidden">
          <TwitterX color="lightGray" size="xs" />
        </div>

        <h3 className="text-white font-semibold text-xl px-2 hidden md:block">{label}</h3>
        
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
        <h3 className="text-white font-semibold text-xl px-2">{label}</h3>
      )}
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
