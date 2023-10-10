import React from "react";

import Button from "../Button";

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
      <div className="fixed left-0 top-0 z-[999] flex h-screen w-screen items-center justify-center bg-slate-600/40">
        <div className="flex w-[320px] flex-col items-center gap-6 rounded-xl bg-black p-10">
          <p className="flex flex-col gap-3 text-sm text-neutral-500">
            <span className="text-lg font-semibold text-ligthGray">
              Delete Tweet?
            </span>
            This can’t be undone and it will be removed from your profile, the
            timeline of any accounts that follow you, and from Twitter search
            results.
          </p>

          <div className="flex w-full flex-col gap-2.5">
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
