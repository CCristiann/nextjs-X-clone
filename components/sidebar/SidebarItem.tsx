import React from "react";
import { IconType } from "react-icons/lib";

import Link from "next/link";

type SidebarItemProps = {
  label: string;
  href?: string;
  icon: IconType;
  onClick: () => void;
};
const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  onClick,
}) => {
  return (
    <div className="flex items-start justify-center lg:justify-start w-fit z-50">
      {/*Mobile*/}
      <Link
        className="realtive rounded-full h-fit w-fit flex items-center justify-center p-3 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden"
        href={href as string}
      >
        <Icon size={22} color="white" />
      </Link>

      {/*Desktop*/}
      <Link
        className="realtive rounded-full gap-4 p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer hidden lg:flex"
        href={href as string}
      >
        <Icon size={26} color="white" />
        <p className="hidden lg:block text-white text-xl">{label}</p>
      </Link>
    </div>
  );
};

export default SidebarItem;
