"use client";

import useEditUserModal from "@/hooks/useEditUserModal";
import Modal from "../Modal";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import Input from "../Input";
import UserHero from "../user/UserHero";
import { useSession } from "next-auth/react";
import useUser from "@/hooks/useUser";
import { Session } from "next-auth";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { BiSolidCheckCircle } from "react-icons/bi";
import Loader from "../Loader";
import { stat } from "fs";
import upload from "@/libs/upload";

type actionProps = { type: "UPDATE_INPUT"; KEY: string; value: string };

type EditUserModalProps = {
  user: User;
};

const EditUserModal: React.FC<EditUserModalProps> = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const editUserModal = useEditUserModal();

  const initialState = {
    name: user.name || "",
    bio: user.bio || "",
    location: user.location || "",
    website: user.website || "",
    profileImage: user.profileImage || "",
    coverImage: user.coverImage || "",
  };

  const reducer = (state = initialState, action: actionProps) => {
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
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    editUserModal.onOpen();
  }, []);

  const OnSubmit = async () => {
    if (
      !state.website.startsWith("http://") &&
      !state.website.startsWith("https://") &&
      state.website !== ""
    ) {
      toast.error('Account update failed: Url is not valid', {
        icon: null,
        style: {
          backgroundColor: '#1D9BF0',
          color: '#e7e9ea',
          width: 'fit-content'
        },
        position: 'bottom-center'
      })
      return;
    }

    setIsLoading(true);

    try {
      if (state.profileImage.startsWith("data")) {
        state.profileImage = await upload(state.profileImage);
        if (!state.profileImage.startsWith("https://")) return;
      }

      if (state.coverImage.startsWith("data")) {
        state.coverImage = await upload(state.coverImage);
        if (!state.coverImage.startsWith("https://")) return;
      }

      const { name, bio, location, website, profileImage, coverImage } = state;

      const res = await axios.patch(`/api/users/${user.id}`, {
        name,
        bio,
        location,
        website,
        coverImage,
        profileImage,
      });

      if (res.status === 200) {
        toast.success("Success!");
      }

    } catch (err) {
        toast.error('Error :/')

    } finally {
      editUserModal.onClose();
      setIsLoading(false);
      router.back();
    }
  };

  const editUserModalBody = (
    <div className="flex flex-col gap-4">
      <UserHero
        user={user}
        coverImage={state.coverImage}
        profileImage={state.profileImage}
        isEditable
        dispatch={dispatch}
      />
      <div className="flex flex-col gap-4 pt-14 pb-8">
        <Input
          type="text"
          label="Name"
          maxLength={50}
          state={state.name}
          KEY="name"
          dispatch={dispatch}
        />
        <Input
          type="text"
          label="Bio"
          isTextarea
          maxLength={160}
          state={state.bio}
          KEY="bio"
          dispatch={dispatch}
        />
        <Input
          type="text"
          label="Location"
          maxLength={30}
          state={state.location}
          KEY="location"
          dispatch={dispatch}
        />
        <Input
          type="text"
          label="Website"
          maxLength={100}
          state={state.website}
          KEY="website"
          dispatch={dispatch}
        />
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={editUserModal.isOpen}
      onClose={editUserModal.onClose}
      onSubmit={OnSubmit}
      title="Edit profile"
      buttonLabel="Save"
      body={editUserModalBody}
      isLoading={isLoading}
      hasTransparentHeader
      hasButtonOnTop
      position="center"
    />
  );
};

export default EditUserModal;
