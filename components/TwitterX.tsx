import { Twitter } from "next/dist/lib/metadata/types/twitter-types";
import React from "react";

type TwitterXProps = {
  color: string;
  size: string;
};
const TwitterX: React.FC<TwitterXProps> = ({ color, size }) => {
  size =
    size == "xs"
      ? "40"
      : size == "sm"
      ? "75"
      : size == "2sm"
      ? "95"
      : size == "md"
      ? "160"
      : size == "2md"
      ? "200"
      : size == "lg"
      ? "250"
      : size == "2lg"
      ? "300"
      : size == "xl"
      ? "320"
      : size == "2xl"
      ? "350"
      : "50";

  return (
    <svg
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 300 300"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66" />
    </svg>
  );
};

export default TwitterX;
