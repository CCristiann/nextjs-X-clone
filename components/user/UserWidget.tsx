"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import Avatar from "./Avatar";
import Menu from "../menu/Menu";
import MenuItem from "../menu/MenuItem";

import { BsThreeDots } from "react-icons/bs";

import { User } from "@prisma/client";

type UserWidgetProps = {
  user?: User;
  hasMenu?: boolean;
  menuOptions?: {
    label?: string;
    onClick?: () => void;
  };
  isAvatarClickable?: boolean;
};
const UserWidget: React.FC<UserWidgetProps> = ({
  user,
  hasMenu,
  menuOptions,
  isAvatarClickable,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  if (!user) return null;

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      onClick={handleClick}
      className="relative w-fit lg:w-full hidden md:flex items-center p-2.5 rounded-full hover:bg-slate-300 hover:bg-opacity-10 duration-150 cursor-pointer"
    >
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="relative w-[40px] h-[40px]">
            {isAvatarClickable ? (
              <Avatar user={user} isClickable />
            ) : (
              <Avatar user={user} />
            )}
          </div>
          <div className="hidden lg:flex flex-col">
            <h4 className="font-semibold text-ligthGray text-sm">
              {user.name}
            </h4>
            <p className="text-neutral-500 text-sm">@{user.username}</p>
          </div>
        </div>
        {hasMenu && (
          <div className="lg:mr-2">
            <BsThreeDots
              size={19}
              color="lightGray"
              className="hidden lg:block"
            />
            <Menu
              setIsOpen={() => setIsOpen(!isOpen)}
              isOpen={isOpen}
              userWidget
            >
              <MenuItem
                label="Add an existing account"
                color="lightGray"
                onClick={() => {}}
              />
              <MenuItem
                label={`Log out @${user.username}`}
                color="lightGray"
                onClick={() => router.push("/logout")}
              />
            </Menu>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserWidget;
