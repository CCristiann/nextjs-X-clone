"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/Button";
import Loader from "@/components/Loader";
import TwitterX from "@/components/TwitterX";

import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

const LogoutPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut({
        redirect: false,
      });

      setTimeout(() => {
        setIsLoading(false);
        router.push("/");
        router.refresh();
      }, 700);
    } catch (err) {
      toast.error("Failed to log out.");
    }
  };
  return (
    <div className="absolute left-0 top-0 z-[999] flex h-screen w-screen items-center justify-center bg-slate-700">
      <div className="flex w-[320px] flex-col items-center gap-6 rounded-xl bg-black p-5">
        <TwitterX size="xs" color="lightGray" />

        <p className="text-sm text-neutral-500">
          <span className="text-lg font-semibold text-ligthGray">
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
      {isLoading && <Loader message="Logging out..." isForFullPage />}
    </div>
  );
};

export default LogoutPage;
