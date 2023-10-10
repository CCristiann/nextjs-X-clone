"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Session } from "next-auth";

import Image from "next/image";
import Form from "../Form";
import Menu from "@/components/menu/Menu";
import MenuItem from "../menu/MenuItem";
import DeleteModal from "../modals/DeleteModal";
import Avatar from "../user/Avatar";

import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import format from "date-fns/format";

import axios from "axios";
import toast from "react-hot-toast";
import useFollow from "@/hooks/useFollow";
import useTweets from "@/hooks/useTweets";
import useLike from "@/hooks/useLike";

import useTweet from "@/hooks/useTweet";
import { PiTwitterLogo } from "react-icons/pi";
import { IoPersonAddOutline, IoPersonOutline } from "react-icons/io5";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { BsThreeDots, BsTrash3 } from "react-icons/bs";

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

  const { isFollowing, toggleFollow } = useFollow(
    tweet.user.id,
    session.user.id,
  );

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

      mutateTweets();
      mutateTweet();
      toast.success("Your tweet was deleted.", {
        icon: null,
        style: {
          backgroundColor: "#1D9BF0",
          color: "#e7e9ea",
          width: "fit-content",
        },
        position: "bottom-center",
      });
    } catch (err) {
      toast.error("Tweet deletion failed.", {
        icon: null,
        style: {
          backgroundColor: "#1D9BF0",
          color: "#e7e9ea",
          width: "fit-content",
        },
        position: "bottom-center",
      });
    } finally {
      setIsDeleteModalOpen(false);
      setIsMenuOpen(false);
      setIsLoading(false);
    }
  };

  const time = format(new Date(tweet.createdAt), "p");

  const createdAt = useMemo(() => {
    return formatDistanceToNowStrict(new Date(tweet.createdAt));
  }, [tweet.createdAt]);

  const { mutate: mutateTweets } = useTweets();
  const { data: fetchedTweet, mutate: mutateTweet } = useTweet(tweet.id);

  if (isForTweetPage) {
    return (
      <div className="w-full border-b-[1px] border-neutral-800 p-1.5">
        <div className="flex w-full flex-col gap-4 px-3 py-2">
          <div className="flex gap-4">
            <div className="relative h-[40px] w-[40px]">
              <Avatar user={tweet.user} isClickable />
            </div>
            <div className="flex flex-col">
              <p className="break-words text-base font-semibold text-ligthGray md:hidden">
                {tweet.user.name.length > 28
                  ? `${tweet.user.name.slice(0, 28)}...`
                  : tweet.user.name}
              </p>
              <p className="hidden break-words text-base font-semibold text-ligthGray md:block">
                {tweet.user.name}
              </p>
              <p className="text-sm text-neutral-500">@{tweet.user.username}</p>
            </div>
          </div>

          <p className="text-base text-ligthGray">{tweet.body}</p>

          {tweet.image && (
            <Image
              src={tweet.image}
              width={1920}
              height={1080}
              className="h-fit max-h-[500px] w-fit rounded-xl object-cover"
              alt="Tweet image"
            />
          )}

          <div>
            <div className="flex items-center gap-2 border-b-[1px] border-neutral-800">
              <p className="py-3 text-sm text-neutral-500">{time}</p>
              <div className="relative h-[3px] w-[3px]">
                <Image src="/assets/icons/dot.svg" fill alt="Dot" />
              </div>
              <p className="py-3 text-sm text-neutral-500">{createdAt}</p>
            </div>

            <div className="flex gap-4 border-b-[1px] border-neutral-800 py-3 text-sm text-neutral-500">
              <p className="flex gap-1.5">
                <span className="text-ligthGray">{tweet.comments.length}</span>
                Comments
              </p>

              <p className="flex gap-1.5" onClick={toggleLike}>
                <span className="text-ligthGray">{tweet.likeIds.length}</span>
                Likes
              </p>
            </div>

            <div className="flex items-center justify-around gap-4 border-b-[1px] border-neutral-800 py-1 text-neutral-500">
              <div className="rounded-full p-2 duration-75 hover:bg-twitterBlue hover:bg-opacity-10 hover:text-twitterBlue">
                <AiOutlineMessage size={23} color="inherit" />
              </div>

              <div
                className={`
                ${hasLiked && "text-rose-500"}
                rounded-full p-2 duration-75 hover:bg-rose-500 hover:bg-opacity-10 hover:text-rose-500
              `}
                onClick={toggleLike}
              >
                {hasLiked ? (
                  <AiFillHeart size={23} color="inherit" />
                ) : (
                  <AiOutlineHeart size={23} color="inherit" />
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
        className="flex w-full cursor-pointer border-b-[1px] border-neutral-800 p-1.5 duration-100 hover:bg-slate-400 hover:bg-opacity-5"
      >
        <div className="h-full px-1.5 py-1 md:px-3 md:py-2">
          <div className="relative h-[40px] w-[40px]">
            <Avatar user={tweet.user} isClickable />
          </div>
        </div>
        <div className="flex w-full flex-col gap-4 px-3 py-2">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="max-w-3/4 flex items-center gap-2.5 overflow-hidden">
                  <p className="flex text-sm font-semibold text-ligthGray">
                    {tweet.user.name.length > 10
                      ? `${tweet.user.name.slice(0, 10)}...`
                      : tweet.user.name}
                  </p>
                  <p className="text-sm text-neutral-500">
                    @
                    {tweet.user.username.length > 10
                      ? `${tweet.user.username.slice(0, 10)}...`
                      : tweet.user.username}
                  </p>
                </div>
                <div className="relative h-[3px] w-[3px]">
                  <Image src="/assets/icons/dot.svg" fill alt="Dot" />
                </div>
                <p className="text-sm text-neutral-500">{createdAt}</p>
              </div>
              <div className="relative">
                <div
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    setIsMenuOpen(true);
                  }}
                  className="rounded-full p-2 text-ligthGray duration-100 hover:bg-twitterBlue hover:bg-opacity-10 hover:text-twitterBlue"
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
                      ${isFollowing ? "Unfollow" : "Follow"}
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
            <p className="text-sm text-ligthGray">{tweet.body}</p>
          </div>

          {tweet.image && (
            <Image
              src={tweet.image}
              width={1920}
              height={1080}
              className="h-fit max-h-[500px] w-fit rounded-xl object-cover"
              alt="Tweet image"
            />
          )}

          <div className="flex items-center gap-5 text-sm text-neutral-500">
            <p
              className="flex items-center gap-1.5 duration-100 hover:text-twitterBlue"
              onClick={composeComment}
            >
              <span className="rounded-full p-2 text-sm duration-100 hover:bg-twitterBlue hover:bg-opacity-20">
                <AiOutlineMessage size={16} color="inherit" />
              </span>
              {fetchedTweet.comments.length}
            </p>
            <p
              className={`
            ${hasLiked && "text-rose-500"}
            flex items-center gap-1.5 duration-100 hover:text-rose-500
          `}
              onClick={onLike}
            >
              <span className="rounded-full p-2 duration-100 hover:bg-rose-500 hover:bg-opacity-10">
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
