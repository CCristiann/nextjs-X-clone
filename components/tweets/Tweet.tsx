"use client";

import { useEffect, useMemo, useState } from "react";
import { Post } from "@prisma/client";
import React from "react";
import Avatar from "../user/Avatar";
import useUser from "@/hooks/useUser";
import useTweets from "@/hooks/useTweets";

import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import format from "date-fns/format";
import Image from "next/image";

import { PiTwitterLogo } from 'react-icons/pi'
import { BsTrash3 } from "react-icons/bs";
import { IoPersonAddOutline, IoPersonOutline } from 'react-icons/io5'
import {
  AiFillHeart,
  AiOutlineComment,
  AiOutlineHeart,
  AiOutlineMessage,
} from "react-icons/ai";

import { useRouter } from "next/navigation";
import Form from "../Form";
import { Session } from "next-auth";

import useLike from "@/hooks/useLike";
import useTweet from "@/hooks/useTweet";
import { BsThreeDots } from "react-icons/bs";

import Menu from "@/components/menu/Menu";
import MenuItem from "../menu/MenuItem";

import DeleteModal from "../modals/DeleteModal";

import axios from "axios";
import toast from "react-hot-toast";
import useFollow from "@/hooks/useFollow";
import { FaTwitter, FaUser } from "react-icons/fa";

type TweetProps = {
  tweet: Record<string, any>;
  session: Session;
  isForTweetPage?: boolean;
};

const Tweet: React.FC<TweetProps> = ({ tweet, session, isForTweetPage }) => {
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { hasLiked, toggleLike } = useLike({
    tweetId: tweet.id,
    userId: session.user.id,
  });

  const { isFollowing, toggleFollow } = useFollow(tweet.user.id, session.user.id)

  const onLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLike();
  };

  const goToTweet = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/tweet/${tweet.id}`);
  };

  const composeComment = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/compose/comment?tweetId=${tweet.id}`);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/tweets/${tweet.id}`);

      mutateTweets()
      mutateTweet()
      toast.success("Success");
    } catch (err) {
      toast.error("Error :/");
    } finally {
      setIsDeleteModalOpen(false);
      setIsMenuOpen(false);
      setIsLoading(false);
    }
  };

  const time = format(new Date(tweet.createdAt), "p");

  const createdAt = useMemo(() => {
    return formatDistanceToNowStrict(new Date(tweet.createdAt), {
      addSuffix: true,
    });
  }, [tweet.createdAt]);

  const { mutate: mutateTweets } = useTweets()
  const { data: fetchedTweet, mutate: mutateTweet } = useTweet(tweet.id);

  if (isForTweetPage) {
    return (
      <div className="w-full p-1.5 border-b-[1px] border-neutral-800">
        <div className="flex flex-col px-3 py-2 w-full gap-4">
          <div className="flex gap-4">
            <div className="relative w-[40px] h-[40px]">
              <Avatar user={tweet.user} isClickable />
            </div>
            <div className="flex flex-col">
              <p className="text-base text-ligthGray font-semibold">
                {tweet.user.name}
              </p>
              <p className="text-neutral-500 text-sm">@{tweet.user.username}</p>
            </div>
          </div>

          <p className="text-base text-ligthGray">{tweet.body}</p>

          {tweet.image && (
            <Image
              src={tweet.image}
              width={1920}
              height={1080}
              className="rounded-xl w-fit h-fit max-h-[500px] object-cover"
              alt="Tweet image"
            />
          )}

          <div>
            <div className="flex items-center gap-2 border-b-[1px] border-neutral-800">
              <p className="py-3 text-neutral-500 text-base">{time}</p>
              <div className="relative w-[3px] h-[3px]">
                <Image src="/assets/icons/dot.svg" fill alt="Dot" />
              </div>
              <p className="py-3 text-neutral-500 text-base">{createdAt}</p>
            </div>

            <div className="py-3 flex gap-4 text-neutral-500 border-b-[1px] border-neutral-800">
              <p className="flex gap-1.5">
                <span className="text-ligthGray">{tweet.comments.length}</span>
                Comments
              </p>

              <p className="flex gap-1.5" onClick={toggleLike}>
                <span className="text-ligthGray">{tweet.likeIds.length}</span>
                Likes
              </p>
            </div>

            <div className="py-1 flex justify-around items-center gap-4 text-neutral-500 border-b-[1px] border-neutral-800">
              <div className="rounded-full p-2 hover:text-twitterBlue hover:bg-twitterBlue hover:bg-opacity-10 duration-75">
                <AiOutlineMessage size={25} color="inherit" />
              </div>

              <div
                className={`
                ${hasLiked && "text-rose-500"}
                rounded-full p-2 hover:text-rose-500 hover:bg-rose-500 hover:bg-opacity-10 duration-75
              `}
                onClick={toggleLike}
              >
                {hasLiked ? (
                  <AiFillHeart size={25} color="inherit" />
                ) : (
                  <AiOutlineHeart size={25} color="inherit" />
                )}
              </div>
            </div>
          </div>
        </div>

        <Form
          session={session}
          placeholder="Post your reply!"
          buttonLabel="Reply"
          tweetId={tweet.id}
        />
      </div>
    );
  }

  if (!fetchedTweet) return null;
  return (
    <>
      <div
        onClick={goToTweet}
        className="w-full p-1.5 flex border-b-[1px] border-neutral-800 hover:bg-slate-400 hover:bg-opacity-5 duration-100 cursor-pointer"
      >
        <div className="h-full px-3 py-2">
          <div className="relative w-[40px] h-[40px]">
            <Avatar user={tweet.user} isClickable />
          </div>
        </div>
        <div className="flex flex-col px-3 py-2 w-full gap-4">
          <div>
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <p className="text-base text-ligthGray font-semibold">
                  {tweet.user.name}
                </p>
                <p className="text-neutral-500 text-sm">
                  @{tweet.user.username}
                </p>
                <div className="relative w-[3px] h-[3px]">
                  <Image src="/assets/icons/dot.svg" fill alt="Dot" />
                </div>
                <p className="text-neutral-500 text-sm">{createdAt}</p>
              </div>
              <div className="relative">
                <div
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    setIsMenuOpen(true);
                  }}
                  className="p-2 rounded-full text-ligthGray hover:text-twitterBlue hover:bg-twitterBlue hover:bg-opacity-10 duration-100"
                >
                  <BsThreeDots size={19} color="inherit" className="z-10" />
                </div>
                <Menu
                  isOpen={isMenuOpen}
                  setIsOpen={() => setIsMenuOpen(!isMenuOpen)}
                  tweetMenu
                >
                  {session.user.id === tweet.user.id && (
                    <MenuItem
                      label="Delete"
                      icon={BsTrash3}
                      color="red"
                      onClick={() => setIsDeleteModalOpen(true)}
                    />
                  )}
                  <MenuItem 
                  label="View tweet"
                  color="lightGray"
                  icon={PiTwitterLogo}
                  onClick={() => router.push(`/tweet/${tweet.id}`)}
                  />
                  {session.user.id !== tweet.user.id && (
                    <MenuItem 
                    label={` 
                      ${isFollowing ? 'Unfollow' : 'Follow'}
                      @${tweet.user.username}
                    `}
                    icon={IoPersonAddOutline}
                    color="lightGray"
                    onClick={toggleFollow}
                    />
                  )}
                  <MenuItem
                    label={`View @${tweet.user.username} profile`}
                    icon={IoPersonOutline}
                    color="lightGray"
                    onClick={() => router.push(`/user/${tweet.user.id}`)}
                  />
                </Menu>
              </div>
            </div>
            <p className="text-base text-ligthGray">{tweet.body}</p>
          </div>

          {tweet.image && (
            <Image
              src={tweet.image}
              width={1920}
              height={1080}
              className="rounded-xl w-fit h-fit max-h-[500px] object-cover"
              alt="Tweet image"
            />
          )}

          <div className="flex gap-5 items-center text-neutral-500 text-sm">
            <p
              className="flex gap-1.5 items-center hover:text-twitterBlue duration-100"
              onClick={composeComment}
            >
              <span className="p-2 rounded-full hover:bg-twitterBlue hover:bg-opacity-20 duration-100">
                <AiOutlineMessage size={16} color="inherit" />
              </span>
              {fetchedTweet.comments.length}
            </p>
            <p
              className={`
            ${hasLiked && "text-rose-500"}
            flex gap-1.5 items-center hover:text-rose-500 duration-100
          `}
              onClick={onLike}
            >
              <span className="p-2 rounded-full hover:bg-rose-500 hover:bg-opacity-10 duration-100">
                {hasLiked ? (
                  <AiFillHeart size={16} color="inherit" />
                ) : (
                  <AiOutlineHeart size={16} color="inherit" />
                )}
              </span>
              {fetchedTweet.likeIds.length}
            </p>
          </div>
        </div>
      </div>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        setIsOpen={() => setIsDeleteModalOpen(false)}
        tweetId={tweet.id}
        onSubmit={handleDelete}
      />
    </>
  );
};

export default Tweet;
