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
            w-full
            rounded-md
            bg-black
            border-[1px]
            border-neutral-800
            pt-6
            px-3
            pb-3
            text-ligthGray
            focus:outline-none
            focus:border-twitterBlue
            placeholder-transparent
            resize-none
            h-32
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
            bg-black
            border-[1px]
            border-neutral-800
            pt-6
            px-3
            pb-3
            text-ligthGray
            focus:outline-none
            focus:border-twitterBlue
            placeholder-transparent
          "
        />
      )}
      <label
        htmlFor={label}
        className="
          absolute
          flex justify-center items-center
          px-3
          left-0
          top-1
          text-twitterBlue
          text-sm
          peer-placeholder-shown:text-neutral-400
          peer-placeholder-shown:text-base
          peer-placeholder-shown:top-5
          peer-focus:text-sm
          peer-focus:top-1
          peer-focus:text-twitterBlue
          transition-all
        "
      >
        {label}
      </label>
      {type === "password" && (
        <div
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-8 inset-y-[20%] h-10 w-10 hover:bg-slate-400 hover:bg-opacity-10 duration-100 rounded-full flex justify-center items-center"
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
