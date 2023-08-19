import React, { useState } from "react";

import Modal from "../Modal";

import TwitterX from "../TwitterX";
import Button from "../Button";

import Loader from "../Loader";

type DeleteModalProps = {
  isOpen?: boolean;
  setIsOpen: () => void;
  tweetId?: string;
  onSubmit: () => void;
};
const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  setIsOpen,
  tweetId,
  onSubmit,
}) => {
  if (isOpen)
    return (
      <div className="flex justify-center items-center fixed top-0 left-0 h-screen w-screen bg-slate-600/40 z-[999]">
        <div className="w-[320px] rounded-xl flex flex-col items-center gap-6 bg-black p-10">
          <p className="text-sm text-neutral-500 flex flex-col gap-3">
            <span className="text-lg text-ligthGray font-semibold">
              Delete Tweet?
            </span>
            This can’t be undone and it will be removed from your profile, the
            timeline of any accounts that follow you, and from Twitter search
            results.
          </p>

          <div className="w-full flex flex-col gap-2.5">
            <Button
              label="Delete"
              fullWidth
              redFillStyle
              additionalPadding
              onClick={onSubmit}
            />

            <Button label="Cancel" fullWidth outlineStyle onClick={setIsOpen} />
          </div>
        </div>
      </div>
    );
};

export default DeleteModal;
