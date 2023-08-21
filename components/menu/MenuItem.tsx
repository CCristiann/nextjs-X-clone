"use client";
import React from "react";

import { IconType } from "react-icons";

type MenuItemProps = {
  label: string;
  color: "red" | "lightGray";
  icon?: IconType;
  onClick: () => void;
};

const MenuItem: React.FC<MenuItemProps> = ({
  label,
  color,
  icon: Icon,
  onClick,
}) => {
  const onSubmit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };
  return (
    <button
      className={`
        ${color === "red" && "text-red-700"}
        ${color === "lightGray" && "text-ligthGray"}
        flex gap-3 items-center px-5 py-3 w-full min-w-[300px] text-sm hover:bg-slate-400 hover:bg-opacity-10 duration-100 font-semibold
      `}
      onClick={onSubmit}
    >
      {Icon && <Icon size={17} color={color} />}
      {label}
    </button>
  );
};

export default MenuItem;
