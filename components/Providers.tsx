"use client";

import React from "react";

import Button from "./Button";

import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";

const Providers = () => {
  return (
    <>
      <Button
        label="Sign up with Google"
        providerIcon={FcGoogle}
        fullWidth
        whiteStyle
        onClick={() => {}}
      />
      <Button
        label="Sign up with Github"
        providerIcon={BsGithub}
        fullWidth
        whiteStyle
        onClick={() => {}}
      />
    </>
  );
};

export default Providers;
