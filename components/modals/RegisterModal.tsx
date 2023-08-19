"use client";

import useRegisterModal from "@/hooks/useRegisterModal";
import Modal from "../Modal";
import React, { useCallback, useEffect, useReducer, useState } from "react";

import { useRouter } from "next/navigation";

import Input from "@/components/Input";

import axios from "axios";

import toast from "react-hot-toast";

import { BsCheckCircleFill } from "react-icons/bs";
import { BiSolidErrorCircle } from "react-icons/bi";

type ActionProps = { type: "UPDATE_INPUT"; KEY: string; value: string };

const initialState = {
  name: "",
  username: "",
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

const RegisterModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const registerModal = useRegisterModal();
  const router = useRouter();

  const [state, dispatch] = useReducer(reducer, initialState);

  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    try {
      const { name, username, email, password } = state;

      const res = await axios.post("/api/register", {
        name,
        username,
        email,
        password,
      });

      setIsLoading(false);
      toast.success("Success!");
    } catch (err) {
      setIsLoading(false);
      toast.error("Error :/");
    } finally {
      registerModal.onClose();
      router.push("/");
    }
  }, [state]);

  useEffect(() => {
    registerModal.onOpen();
  }, []);

  const registerModalBody = (
    <form className="flex flex-col gap-6">
      <Input type="text" label="Name" KEY="name" dispatch={dispatch} />
      <Input type="text" label="Username" KEY="username" dispatch={dispatch} />
      <Input type="email" label="Email" KEY="email" dispatch={dispatch} />
      <Input
        type="password"
        label="Password"
        KEY="password"
        dispatch={dispatch}
      />
    </form>
  );

  return (
    <Modal
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      title="Create your account"
      buttonLabel="Register"
      body={registerModalBody}
      isLoading={isLoading}
      position="center"
    />
  );
};

export default RegisterModal;
