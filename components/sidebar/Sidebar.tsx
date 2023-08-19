import React from "react";

import SidebarItem from "./SidebarItem";
import TweetBtn from "./TweetBtn";
import UserWidget from "../user/UserWidget";

import TwitterX from "../TwitterX";
import { Session } from "next-auth";

import User from "./User";

import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { FaUser, FaSearch } from "react-icons/fa";

type SidebarProps = {
  session: Session;
};

const Sidebar: React.FC<SidebarProps> = ({ session }) => {
  const sidebarLinks = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill,
    },
    {
      label: "Explore",
      href: "/",
      icon: FaSearch,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBellFill,
    },
    {
      label: "Profile",
      href: `/user/${session.user.id}`,
      icon: FaUser,
    },
  ]

  return (
    <div className="fixed bottom-0 border-t-[1px] border-neutral-800 w-screen flex justify-center md:max-h-screen md:sticky md:top-0 md:w-fit md:flex-col md:justify-between md:items-center paddings bg-black z-50">
      <div className="flex w-full flex-col gap-5">
        <div className="hidden md:flex justify-start p-4 w-fit rounded-full hover:bg-slate-400 hover:bg-opacity-10 duration-100">
          <TwitterX size="xs" color="lightGray" />
        </div>
        <div className="flex flex-row justify-around md:flex-col md:items-center lg:items-start gap-2.5 w-full">
          {sidebarLinks.map((link, i: number) => (
            <SidebarItem
              key={i}
              label={link.label}
              href={link.href}
              icon={link.icon}
              onClick={() => {}}
            />
          ))}
          <TweetBtn />
        </div>
      </div>

      <User session={session} />
    </div>
  );
};

export default Sidebar;
