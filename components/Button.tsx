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
      rounded-full font-semibold duration-150 hover:bg-opacity-20 disabled:cursor-not-allowed disabled:opacity-70
      ${Icon && "flex items-center justify-center gap-3 text-sm"}
      ${fullWidth && "w-full"}
      ${large ? "px-5 py-3 text-lg" : "px-4 text-sm"}
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
        "border-[1px] border-red-700  bg-transparent text-red-700"
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
