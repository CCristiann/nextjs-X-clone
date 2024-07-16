import React, { ChangeEvent } from "react";

import Image from "next/image";
import Avatar from "./Avatar";

import { MdOutlineAddAPhoto } from "react-icons/md";

import { User } from "@prisma/client";

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
      <div className="relative h-44 w-full bg-neutral-700">
        {coverImage && <Image src={coverImage} fill alt="Cover Image" className="object-cover" />}
        {isEditable && (
          <div className="absolute left-[50%] top-[50%] flex h-[42px] w-[42px] translate-x-[-50%] translate-y-[-50%] items-center justify-center rounded-full bg-black/40">
            <MdOutlineAddAPhoto size={20} color="white" />
            <input
              id="coverImage"
              className="absolute left-0 top-0 h-full w-full opacity-0"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        )}
        <div className="absolute -bottom-14 left-4 h-[120px] w-[120px]">
          {user && <Avatar user={user} image={profileImage} hasBorder />}
          {isEditable && (
            <div className="absolute left-[50%] top-[50%] flex h-[42px] w-[42px] translate-x-[-50%] translate-y-[-50%] items-center justify-center rounded-full bg-black/40">
              <MdOutlineAddAPhoto size={20} color="white" />
              <input
                id="profileImage"
                className="absolute left-0 top-0 h-full w-full opacity-0"
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
