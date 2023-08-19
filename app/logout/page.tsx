"use client";
import { useState } from "react";

import Button from "@/components/Button";
import Loader from "@/components/Loader";
import TwitterX from "@/components/TwitterX";
import { signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React from "react";

const LogoutPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      await signOut();
      setIsLoading(false);
      router.push("/");
    }, 700);
  };
  return (
    <div className="z-[999] absolute top-0 left-0 w-screen h-screen bg-slate-700 flex justify-center items-center">
      <div className="w-[320px] rounded-xl flex flex-col items-center gap-6 bg-black p-5">
        <TwitterX size="xs" color="lightGray" />

        <p className="text-sm text-neutral-500">
          <span className="font-semibold text-lg text-ligthGray">
            Log out of Twitter?
          </span>
          <br />
          You can always log back in at any <br />
          time. If you just want to switch <br />
          accounts, you can do that by adding <br />
          an existing account.
        </p>

        <Button label="Log out" whiteStyle fullWidth onClick={handleLogout} />
        <Button
          label="Cancel"
          outlineStyle
          fullWidth
          onClick={() => router.push("/")}
        />
      </div>
      {isLoading && <Loader message="Loggin out..." isForFullPage />}
    </div>
  );
};

export default LogoutPage;
