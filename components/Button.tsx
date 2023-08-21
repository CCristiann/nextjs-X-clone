"use client";

import React from "react";

import { IconType } from "react-icons";

type ButtonProps = {
  label: string;
  fullWidth?: boolean;
  outlineStyle?: boolean;
  blueStyle?: boolean;
  whiteStyle?: boolean;
  redOutlineStyle?: boolean;
  redFillStyle?: boolean;
  large?: boolean;
  additionalPadding?: boolean;
  disabled?: boolean;
  onClick: () => void;
  providerIcon?: IconType;
};
const Button: React.FC<ButtonProps> = ({
  label,
  fullWidth,
  whiteStyle,
  outlineStyle,
  blueStyle,
  redOutlineStyle,
  redFillStyle,
  large,
  additionalPadding,
  disabled,
  onClick,
  providerIcon: Icon,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
      rounded-full font-semibold disabled:opacity-70 disabled:cursor-not-allowed hover:bg-opacity-20 duration-150
      ${Icon && "flex justify-center items-center gap-3 text-sm"}
      ${fullWidth && "w-full"}
      ${large ? "text-xl px-5 py-3" : "text-md px-4"}
      ${additionalPadding ? "py-2.5" : "py-2"}
      ${
        outlineStyle &&
        "border border-neutral-500 text-twitterBlue hover:bg-twitterBlue"
      }
      ${!outlineStyle ? "hover:bg-opacity-70" : "bg-opacity-10"}
      ${blueStyle && "bg-twitterBlue text-white"}
      ${whiteStyle && "bg-white text-black"}
      ${
        redOutlineStyle &&
        "bg-transparent text-red-700  border-[1px] border-red-700"
      }
      ${redFillStyle && "bg-red-700 text-ligthGray"}
    `}
    >
      {Icon && <Icon size={25} />}
      {label}
    </button>
  );
};

export default Button;
