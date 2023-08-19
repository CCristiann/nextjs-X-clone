"use client";
import { User } from "@prisma/client";
import Button from "@/components/Button";
import React, { useMemo } from "react";
import { Session, getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

import { format } from "date-fns";
import { BiCalendar, BiLink } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";

import { useRouter } from "next/navigation";
import Link from "next/link";
import useFollow from "@/hooks/useFollow";

type UserBioProps = {
  user: User;
  session: Session;
};

const UserBio: React.FC<UserBioProps> = ({ user, session }) => {
  const router = useRouter();

  const createdAt = useMemo(() => {
    return format(new Date(user.createdAt), "MMMM yyyy");
  }, [user.createdAt]);

  const handleProfileBtnClick = (action: "edit" | "follow") => {
    if (action === "edit") {
      router.push("/user/edit");
    }
  };

  const { isFollowing, toggleFollow } = useFollow(user.id, session.user.id);

  return (
    <div className="border-b-[1px] border-neutral-800 pb-5">
      <div className="flex justify-end items-center px-4 py-2.5">
        {session.user.id === user.id ? (
          <Button
            label="Edit profile"
            outlineStyle
            onClick={() => handleProfileBtnClick("edit")}
          />
        ) : (
          <>
            {isFollowing ? (
              <Button
                label={"Unfollow"}
                redOutlineStyle
                onClick={toggleFollow}
              />
            ) : (
              <Button label={"Follow"} whiteStyle onClick={toggleFollow} />
            )}
          </>
        )}
      </div>
      <div className="flex flex-col gap-4 px-4 py-2.5">
        <div className="flex flex-col">
          <p className="text-lg text-ligthGray font-semibold">{user.name}</p>
          <p className="text-neutral-500 text-base">@{user.username}</p>
        </div>

        <>
          {user.bio ? (
            <p className="text-base text-ligthGray w-full">{user.bio}</p>
          ) : (
            <p className="text-base text-ligthGray w-full">
              This user has no bio.
            </p>
          )}
        </>

        <div className="w-full flex flex-wrap gap-4 text-base text-neutral-500 ">
          {user.location && (
            <p className="flex gap-1.5 items-center">
              <span>
                <HiOutlineLocationMarker size={20} color="inherit" />
              </span>
              {user.location}
            </p>
          )}

          {user.website && (
            <p className="flex gap-1.5 items-center">
              <span>
                <BiLink size={20} color="inherit" />
              </span>
              <Link
                href={user.website}
                className="text-twitterBlue hover:underline"
                target="_blank"
              >
                {user.website}
              </Link>
            </p>
          )}

          <p className="flex gap-1.5 items-center">
            <span>
              <BiCalendar size={20} color="inherit" />
            </span>
            Joined {createdAt}
          </p>
        </div>

        <div className="flex gap-3 items-center text-ligthGray">
          <p className="flex gap-1.5">
            {user.followingIds.length}
            <span className="text-neutral-500">Following</span>
          </p>
          <p className="flex gap-1.5">
            {user.followersCount}
            <span className="text-neutral-500">Followers</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
