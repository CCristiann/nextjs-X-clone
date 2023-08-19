import { User } from "@prisma/client";
import Image from "next/image";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import Avatar from "./Avatar";

import { MdOutlineAddAPhoto } from "react-icons/md";
import Loader from "../Loader";

type UserHeroProps = {
  user?: User;
  coverImage?: string;
  profileImage?: string;
  isEditable?: boolean;
  dispatch: ({ type, KEY, value }: any) => void;
};
const UserHero: React.FC<UserHeroProps> = ({
  user,
  coverImage,
  profileImage,
  isEditable,
  dispatch,
}) => {
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes("image")) {
      alert("Please select an image");
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;

      dispatch({
        type: "UPDATE_INPUT",
        KEY: e.target.id,
        value: result,
      });
    };
  };

  return (
    <div>
      <div className="bg-neutral-700 h-44 w-full relative">
        {coverImage && <Image src={coverImage} fill alt="Cover Image" />}
        {isEditable && (
          <div className="absolute flex items-center justify-center w-[42px] h-[42px] rounded-full bg-black/40 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <MdOutlineAddAPhoto size={20} color="white" />
            <input
              id="coverImage"
              className="absolute top-0 left-0 opacity-0 w-full h-full"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        )}
        <div className="absolute -bottom-14 left-4 w-[120px] h-[120px]">
          {user && <Avatar user={user} image={profileImage} hasBorder />}
          {isEditable && (
            <div className="absolute flex items-center justify-center w-[42px] h-[42px] rounded-full bg-black/40 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
              <MdOutlineAddAPhoto size={20} color="white" />
              <input
                id="profileImage"
                className="absolute top-0 left-0 opacity-0 w-full h-full"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserHero;
