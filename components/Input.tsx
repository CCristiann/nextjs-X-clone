"use client";
import React, { useState } from "react";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type InputProps = {
  label: string;
  type: string;
  state?: string;
  isTextarea?: boolean;
  maxLength?: number;
  required?: boolean;
  disabled?: boolean;
  KEY: string;
  dispatch: ({ type, KEY, value }: any) => void;
};
const Input: React.FC<InputProps> = ({
  label,
  type,
  state,
  isTextarea,
  maxLength,
  required,
  disabled,
  KEY,
  dispatch,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      {isTextarea ? (
        <textarea
          maxLength={maxLength}
          required={required}
          id={label}
          placeholder={label}
          defaultValue={state}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_INPUT",
              KEY: KEY,
              value: e.currentTarget.value,
            })
          }
          className="
            peer
            h-32
            w-full
            resize-none
            rounded-md
            border-[1px]
            border-neutral-800
            bg-black
            px-3
            pb-3
            pt-6
            text-ligthGray
            placeholder-transparent
            focus:border-twitterBlue
            focus:outline-none
          "
        />
      ) : (
        <input
          maxLength={maxLength}
          required={required}
          id={label}
          defaultValue={state}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={label}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_INPUT",
              KEY: KEY,
              value: e.currentTarget.value,
            })
          }
          className="
            peer
            w-full
            rounded-md
            border-[1px]
            border-neutral-800
            bg-black
            px-3
            pb-3
            pt-6
            text-ligthGray
            placeholder-transparent
            focus:border-twitterBlue
            focus:outline-none
          "
        />
      )}
      <label
        htmlFor={label}
        className="
          absolute
          left-0 top-1 flex
          items-center
          justify-center
          px-3
          text-sm
          text-twitterBlue
          transition-all
          peer-placeholder-shown:top-5
          peer-placeholder-shown:text-base
          peer-placeholder-shown:text-neutral-400
          peer-focus:top-1
          peer-focus:text-sm
          peer-focus:text-twitterBlue
        "
      >
        {label}
      </label>
      {type === "password" && (
        <div
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-[20%] right-8 flex h-10 w-10 items-center justify-center rounded-full duration-100 hover:bg-slate-400 hover:bg-opacity-10"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible size={22} color="white" />
          ) : (
            <AiOutlineEye size={22} color="white" />
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
