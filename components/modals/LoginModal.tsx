"use client";

import React, { useCallback, useEffect, useReducer, useState } from "react";
import { signIn } from "next-auth/react";

import Modal from "../Modal";
import Input from "@/components/Input";

import useLoginModal from "@/hooks/useLoginModal";
import toast from "react-hot-toast";
import formValidation from "@/libs/formValidation";

type ActionProps = { type: "UPDATE_INPUT"; KEY: string; value: string };

const initialState = {
  email: "",
  password: "",
};

const reducer = (state = initialState, action: ActionProps) => {
  switch (action.type) {
    case "UPDATE_INPUT":
      return {
        ...state,
        [action.KEY]: action.value,
      };
    default:
      return state;
  }
};
const LoginModal = () => {
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    loginModal.onOpen();
  }, []);

  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    const { email, password } = state;

    const validation = formValidation(state);

    if (!validation.isValidated && validation.toastMessage) {
      toast.error(validation.toastMessage, {
        icon: null,
        style: {
          backgroundColor: "#1D9BF0",
          color: "#e7e9ea",
          width: "fit-content",
        },
        position: "bottom-center",
      });

      setIsLoading(false);
      return;
    }

    try {
      await signIn("credentials", {
        email,
        password,
        redirect: true,
      });

      toast.success("Logged in!");
    } catch (err) {
      console.log(err);
      toast.error("Error :/");
    } finally {
      setIsLoading(false);
      loginModal.onClose();
    }
  }, [state, loginModal]);

  const loginModalBody = (
    <div className="flex flex-col gap-4">
      <Input type="email" label="Email" KEY="email" dispatch={dispatch} />
      <Input
        type="password"
        label="Password"
        KEY="password"
        dispatch={dispatch}
      />
    </div>
  );
  return (
    <Modal
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      title="Login"
      buttonLabel="Log in"
      body={loginModalBody}
      isLoading={isLoading}
      position="center"
    />
  );
};

export default LoginModal;
