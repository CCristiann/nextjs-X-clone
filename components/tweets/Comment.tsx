"use client";

import React, { useMemo } from "react";

import Avatar from "../user/Avatar";
import Image from "next/image";

import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";

type CommentProps = {
  comment: Record<string, any>;
};
const Comment: React.FC<CommentProps> = ({ comment }) => {
  const createdAt = useMemo(() => {
    return formatDistanceToNowStrict(new Date(comment.createdAt));
  }, [comment.createdAt]);

  return (
    <div className="flex min-h-[100px] w-full cursor-pointer border-b-[1px] border-neutral-800 py-1.5 duration-100 hover:bg-slate-400 hover:bg-opacity-5">
      <div className="h-full px-3 py-2">
        <div className="relative h-[40px] w-[40px]">
          <Avatar user={comment.user} isClickable />
        </div>
      </div>
      <div className="flex w-full flex-col gap-4 px-3 py-2">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <p className="text-sm font-semibold text-ligthGray">
              {comment.user.name}
            </p>
            <p className="text-sm text-neutral-500">@{comment.user.username}</p>
            <div className="relative h-[3px] w-[3px]">
              <Image src="/assets/icons/dot.svg" fill alt="Dot" />
            </div>
            <p className="text-sm text-neutral-500">{createdAt}</p>
          </div>
          <p className="text-sm text-ligthGray">{comment.body}</p>
        </div>

        {comment.image && (
          <Image
            src={comment.image}
            width={1920}
            height={1080}
            className="h-fit max-h-[500px] w-fit rounded-xl object-cover"
            alt="Tweet image"
          />
        )}

        {/* <div className="flex gap-5 items-center text-neutral-500 text-sm">
          <p className="flex gap-1.5 items-center hover:text-twitterBlue duration-100">
            <span className="p-2 rounded-full hover:bg-twitterBlue hover:bg-opacity-20 duration-100">
              <AiOutlineMessage size={16} color="inherit" />
            </span>
            {tweet.comments.length}
          </p>
          <p className="flex gap-1.5 items-center hover:text-rose-500 duration-100">
            <span className="p-2 rounded-full hover:bg-rose-500 hover:bg-opacity-10 duration-100">
              <AiOutlineHeart size={16} color="inherit" />
            </span>
            {tweet.likeIds.length}
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Comment;
