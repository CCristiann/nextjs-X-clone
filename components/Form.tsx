"use client";

import React, { ChangeEvent, useReducer, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Session } from "next-auth";

import Image from "next/image";
import Avatar from "@/components/user/Avatar";
import Button from "@/components/Button";
import Loader from "./Loader";

import useUser from "@/hooks/useUser";
import useTweets from "@/hooks/useTweets";

import axios from "axios";
import upload from "@/libs/upload";
import toast from "react-hot-toast";
import { TweetCreationRequest } from '@/libs/validators/tweet'

import { PiImageSquareBold } from "react-icons/pi";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { IconType } from "react-icons";
import { CommentCreationRequest } from "@/libs/validators/comment";

type actionProps = { type: "UPDATE_INPUT"; KEY: string; value: string };

const initialState = {
  body: "",
  image: "",
};

const reducer = (state = initialState, action: actionProps) => {
  switch (action.type) {
    case "UPDATE_INPUT":
      return {
        ...state,
        [action.KEY]: action.value,
      };

    default:
      return state;
  }
};
const createTweetUtils = [
  {
    label: "Media",
    icon: PiImageSquareBold,
  },
  {
    label: "Emoji",
    icon: HiOutlineEmojiHappy,
  },
];

type FormUtilsProps = {
  label: string;
  icon: IconType;
  onClick?: () => void;
};

type FormProps = {
  session: Session;
  placeholder: string;
  buttonLabel: string;
  tweetId?: string;
  isModal?: boolean;
};

const Form: React.FC<FormProps> = ({
  session,
  placeholder,
  buttonLabel,
  tweetId,
  isModal,
}) => {
  const router = useRouter();
  const pathName = usePathname();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const { mutate: mutateTweets } = useTweets();

  const { data: user } = useUser(session.user.id);
  if (!user) return null;

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
        KEY: "image",
        value: result,
      });
    };
  };

  const HandleSubmit = async () => {
    setIsSubmitting(true);

    if (state.image.startsWith("data")) {
      state.image = await upload(state.image);

      if (!state.image.startsWith("https://")) return;
    }

    const { body, image } = state;
    const creator = user.id;

    if (buttonLabel === "Post") {
      try {
        const payload: TweetCreationRequest = {
          body,
          image,
          creator
        }
        const res = await axios.post("/api/tweets/create", payload);

        if (res.status === 200) {
          mutateTweets();
          toast.success("Success!");
        }
      } catch (err) {
        toast.error("Error :/");
      }
    } else if (buttonLabel === "Reply") {
      try {
        const payload: CommentCreationRequest = {
          body,
          image,
          creator,
          tweetId
        }

        const res = await axios.post("/api/comment", payload);

        if (res.status === 200) {
          mutateTweets();
          toast.success("Success!");
        }
      } catch (err) {
        toast.error("Error :/");
      }
    }

    state.body = "";
    state.image = "";

    setIsSubmitting(false);
    if (isModal) router.push("/");
  };

  return (
    <div
      className={`
      ${!isModal && pathName !== `/tweet/${tweetId}` && "border-b-[1px] border-neutral-800 px-1.5"}
      flex flex-col py-1.5 relative
    `}
    >
      {isSubmitting && !isModal && (
        <div className="absolute top-0 left-0 w-full h-full bg-slate-400/10 z-50">
          <Loader />
        </div>
      )}
      <div
        className={`
      ${isModal && "min-h-[100px]"}
      flex w-full
    `}
      >
        <div className="px-2 py-1 flex justify-center">
          <div className="relative w-[40px] h-[40px]">
            <Avatar user={user} isClickable />
          </div>
        </div>
        <div className="w-full flex flex-col px-2 py-1">
          <div className="w-full">
            <textarea
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_INPUT",
                  KEY: "body",
                  value: e.currentTarget.value,
                })
              }
              value={state.body}
              placeholder={placeholder}
              className={`
              ${!isModal && "focus:h-[100px]"}
              peer p-1.5 w-full h-[45px] border-0 focus:ring-0 focus:outline-0 resize-none focus:ring-offset-0 bg-black text-ligthGray text-lg transition-all
            `}
            />
            <div className="image-container">
              {state.image && (
                <>
                  <Image
                    src={state.image}
                    width={1920}
                    height={1080}
                    className="rounded-xl w-fit h-fit max-h-[500px] object-cover mb-4"
                    alt="Tweet image"
                  />
                  <div className="cursor-pointer p-2.5 bg-black rounded-full absolute top-4 right-4">
                    <IoMdClose
                      color="white"
                      size={25}
                      onClick={() =>
                        dispatch({
                          type: "UPDATE_INPUT",
                          KEY: "image",
                          value: "",
                        })
                      }
                    />
                  </div>
                </>
              )}
            </div>
            {!isModal && (
              <div className="peer-focus:block hidden w-full h-[1px] bg-neutral-800 transition-all mb-3"></div>
            )}
          </div>
          {!isModal && (
            <div className="flex justify-between items-center">
              <div className="flex ites-center justify-start">
                {createTweetUtils.map(
                  ({ label, icon: Icon, onClick }: FormUtilsProps) => (
                    <div
                      key={label}
                      className="relative p-2 flex items-center justify-center hover:bg-twitterBlue hover:bg-opacity-10 duration-100 rounded-full"
                    >
                      <Icon size={21} color="#1D9BF0" onClick={onClick} />
                      {label === "Media" && (
                        <input
                          className="absolute w-[37px] h-[37px] opacity-0"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      )}
                    </div>
                  ),
                )}
              </div>

              <Button
                label={buttonLabel}
                blueStyle
                disabled={state.body === "" ? true : false}
                onClick={HandleSubmit}
              />
            </div>
          )}
        </div>
      </div>
      {isModal && (
        <div className="w-full flex justify-between items-center pt-3.5 border-t-[1px] border-neutral-800">
          <div className="flex ites-center justify-start">
            {createTweetUtils.map(
              ({ label, icon: Icon, onClick }: FormUtilsProps) => (
                <div
                  key={label}
                  className="relative p-2 flex items-center justify-center hover:bg-twitterBlue hover:bg-opacity-10 duration-100 rounded-full"
                >
                  <Icon size={21} color="#1D9BF0" onClick={onClick} />
                  {label === "Media" && (
                    <input
                      className="absolute w-[37px] h-[37px] opacity-0"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  )}
                </div>
              ),
            )}
          </div>

          <Button
            label={buttonLabel}
            blueStyle
            disabled={state.body === "" ? true : false || isSubmitting}
            onClick={HandleSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default Form;
