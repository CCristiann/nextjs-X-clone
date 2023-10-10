"use client";

import React from "react";

import { useRouter } from "next/navigation";

import Image from "next/image";

import { User } from "@prisma/client";

type AvatarProps = {
  user?: User;
  image?: string;
  hasBorder?: boolean;
  isClickable?: boolean;
};
const Avatar: React.FC<AvatarProps> = ({
  user,
  image,
  hasBorder,
  isClickable,
}) => {
  const router = useRouter();

  if (!user) return null;

  const url = `/user/${user.id}`;
  const goToUser = (e: React.MouseEvent) => {
    e.stopPropagation();

    router.push(url);
  };

  const src = image
    ? image
    : user.profileImage
    ? user.profileImage
    : "/assets/images/user-placeholder.png";

  return (
    <>
      {isClickable ? (
        <Image
          onClick={goToUser}
          className={`
        ${hasBorder && "border-4 border-black"}
        cursor-pointer rounded-full
      `}
          src={src}
          fill
          alt="user image"
        />
      ) : (
        <Image
          className={`
        ${hasBorder && "border-4 border-black"}
        rounded-full
      `}
          src={src}
          fill
          alt="user image"
        />
      )}
    </>
  );
};

export default Avatar;
