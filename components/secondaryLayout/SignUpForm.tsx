"use client";

import React from "react";
import { useRouter } from "next/navigation";

import Providers from "../Providers";
import TwitterX from "../TwitterX";
import Button from "../Button";

import useLoginModal from "@/hooks/useLoginModal";
import useTweets from "@/hooks/useTweets";

const SignUpForm = () => {
  const router = useRouter();

  return (
    <div className="md:w-[60vw] lg:w-[55vw] text-white flex flex-col self-center gap-5 px-12 py-8 md:justify-center">
      <TwitterX size="xs" color="lightGray" />

      <h1 className="w-[65%] md:w-fit leading-[2.90rem] font-bold text-4xl md:text-6xl tracking-wide text-ligthGray my-5 md:my-8">
        Happening now
      </h1>
      <h4 className="font-bold text-2xl md:text-4xl text-ligthGray">
        Join Twitter today.
      </h4>

      <div className="w-[300px] flex flex-col gap-4">
        <Providers />

        <div className="w-full flex gap-2 items-center justify-center">
          <span className="w-full h-[1px] bg-neutral-800"></span>
          <span>or</span>
          <span className="w-full h-[1px] bg-neutral-800"></span>
        </div>

        <Button
          label="Create Account"
          blueStyle
          fullWidth
          onClick={() => router.push("/register")}
        />

        <p className="text-xs text-neutral-400">
          By signing up, you agree to the
          <a href="/" className="text-twitterBlue hover:underline">
            &nbsp;Terms of Service&nbsp;
          </a>
          and
          <a href="/" className="text-twitterBlue hover:underline">
            &nbsp;Privacy Policy
          </a>
          , including
          <a href="/" className="text-twitterBlue hover:underline">
            &nbsp;Cookie Use&nbsp;
          </a>
          .
        </p>

        <div className="w-full flex flex-col gap-4 my-10">
          <h4 className="text-lightGray font-semibold text-base">
            Already have an account?
          </h4>
          <Button
            label="Sign in"
            fullWidth
            outlineStyle
            onClick={() => router.push("/login")}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
