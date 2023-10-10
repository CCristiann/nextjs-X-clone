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
        flex w-full min-w-[300px] items-center gap-3 px-5 py-3 text-sm font-semibold duration-100 hover:bg-slate-400 hover:bg-opacity-10
      `}
      onClick={onSubmit}
    >
      {Icon && <Icon size={17} color={color} />}
      {label}
    </button>
  );
};

export default MenuItem;
