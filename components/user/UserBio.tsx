"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";

import { Session } from "next-auth";

import Link from "next/link";
import Button from "@/components/Button";

import { format } from "date-fns";
import useFollow from "@/hooks/useFollow";
import { User } from "@prisma/client";

import { BiCalendar, BiLink } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";

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
      <div className="flex items-center justify-end px-4 py-2.5">
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
          <p className="break-words text-base font-semibold text-ligthGray">
            {user.name}
          </p>
          <p className="break-words text-sm text-neutral-500">
            @{user.username}
          </p>
        </div>

        <>
          {user.bio ? (
            <p className="w-full break-words text-sm text-ligthGray">
              {user.bio}
            </p>
          ) : (
            <p className="w-full text-sm text-ligthGray">
              This user has no bio.
            </p>
          )}
        </>

        <div className="flex w-full flex-wrap gap-4 text-base text-neutral-500 ">
          {user.location && (
            <p className="flex items-center gap-1.5 text-sm">
              <span>
                <HiOutlineLocationMarker size={18} color="inherit" />
              </span>
              {user.location}
            </p>
          )}

          {user.website && (
            <p className="flex items-center gap-1.5 text-sm">
              <span>
                <BiLink size={18} color="inherit" />
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

          <p className="flex items-center gap-1.5 text-sm">
            <span>
              <BiCalendar size={18} color="inherit" />
            </span>
            Joined {createdAt}
          </p>
        </div>

        <div className="flex items-center gap-3 text-sm text-ligthGray">
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
