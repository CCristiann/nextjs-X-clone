"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Session } from "next-auth";

import Modal from "../Modal";
import Form from "../Form";

import useFormModal from "@/hooks/useFormModal";

import { AiOutlineClose } from "react-icons/ai";

type FormModalProps = {
  session: Session;
  placeholder: string;
  buttonLabel: "Post" | "Reply";
};

const FormModal: React.FC<FormModalProps> = ({
  session,
  placeholder,
  buttonLabel,
}) => {
  const router = useRouter();

  const formModal = useFormModal();

  const handleClose = () => {
    formModal.onClose();
    router.push("/");
  };

  useEffect(() => {
    formModal.onOpen();
  }, []);

  const searchParams = useSearchParams();
  const tweetId = searchParams.get("tweetId");

  const formModalConent = (
    <div className="text-white">
      <div className="p-2 sticky top-0 flex gap-2.5 items-center bg-black/60 backdrop-blur-lg z-50">
        <button
          className="p-3 hover:bg-slate-300 hover:bg-opacity-10 rounded-full transition"
          onClick={handleClose}
        >
          <AiOutlineClose size={20} color="white" />
        </button>
      </div>
      <div className="px-3 py-2">
        <Form
          session={session}
          placeholder={placeholder}
          buttonLabel={buttonLabel}
          tweetId={tweetId || ""}
          isModal
        />
      </div>
    </div>
  );
  return (
    <Modal
      isOpen={formModal.isOpen}
      onClose={formModal.onClose}
      onSubmit={() => {}}
      position="topCenter"
      isFormModal
      formModalContent={formModalConent}
    />
  );
};

export default FormModal;
