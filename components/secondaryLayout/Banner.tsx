import React from "react";

import Image from "next/image";

import TwitterX from "../TwitterX";

const Banner = () => {
  return (
    <div className="w-screen h-full md:w-[40vw] lg:w-[65vw] md:h-[95vh] relative">
      <Image
        className="h-full w-full object-cover"
        src="/assets/images/banner.png"
        width={1920}
        height={1080}
        alt="banner"
      />
      <div className="flex md:hidden items-center justify-center w-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-5">
        <TwitterX size="2md" color="white" />
      </div>
      <div className="hidden md:flex lg:hidden items-center justify-center w-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-5">
        <TwitterX size="xl" color="white" />
      </div>
      <div className="hidden lg:flex items-center justify-center w-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-5">
        <TwitterX size="2xl" color="white" />
      </div>
    </div>
  );
};

export default Banner;
