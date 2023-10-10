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
    <div className="flex flex-col gap-5 self-center px-12 py-8 text-white md:w-[60vw] md:justify-center lg:w-[55vw]">
      <TwitterX size="xs" color="lightGray" />

      <h1 className="my-5 w-[65%] text-4xl font-bold leading-[2.90rem] tracking-wide text-ligthGray md:my-8 md:w-fit md:text-6xl">
        Happening now
      </h1>
      <h4 className="text-2xl font-bold text-ligthGray md:text-4xl">
        Join Twitter today.
      </h4>

      <div className="flex w-[300px] flex-col gap-4">
        <Providers />

        <div className="flex w-full items-center justify-center gap-2">
          <span className="h-[1px] w-full bg-neutral-800"></span>
          <span>or</span>
          <span className="h-[1px] w-full bg-neutral-800"></span>
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

        <div className="my-10 flex w-full flex-col gap-4">
          <h4 className="text-lightGray text-base font-semibold">
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
