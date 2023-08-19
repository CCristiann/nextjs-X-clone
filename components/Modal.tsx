"use client";

import React, { useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";

import Button from "./Button";
import { useRouter } from "next/navigation";
import Loader from "./Loader";

type ModalProps = {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  position: "topCenter" | "center";
  hasTransparentHeader?: boolean;
  hasButtonOnTop?: boolean;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  buttonLabel?: string;
  disabled?: boolean;
  isLoading?: boolean;
  isFormModal?: boolean;
  formModalContent?: React.ReactElement;
};
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  hasTransparentHeader,
  hasButtonOnTop,
  position,
  body,
  footer,
  buttonLabel,
  disabled,
  isLoading,
  isFormModal,
  formModalContent,
}) => {
  const router = useRouter();

  const handleClose = useCallback(() => {
    if (disabled) return;

    onClose();
    router.push("/");
  }, [disabled, onClose, router]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [disabled, onSubmit, router]);

  if (!isOpen) return null;

  if (isFormModal)
    return (
      <div className="modal_overlay-topCenter">
        <div
          className={`
        ${!isLoading && "overflow-auto"}
        ${position === "topCenter" && "md:top-10"}
        modal_wrapper
      `}
        >
          {formModalContent}
        </div>
      </div>
    );

  return (
    <div
      className={
        position === "center"
          ? "modal_overlay-center"
          : "modal_overlay-topCenter"
      }
    >
      <div
        className={`
        ${!isLoading && "overflow-auto"}
        ${position === "topCenter" && "md:top-10"}
        modal_wrapper
      `}
      >
        {isLoading ? (
          <div className="w-full h-[600px]">
            <Loader />
          </div>
        ) : (
          <>
            <div
              className={`
          ${
            hasTransparentHeader && "bg-black/40 backdrop-blur-md sticky top-0"
          }
          flex justify-between items-center px-3 py-1.5 z-50
        `}
            >
              <div className="flex gap-2.5 items-center">
                <button
                  className="p-3 hover:bg-slate-300 hover:bg-opacity-10 rounded-full transition"
                  onClick={handleClose}
                >
                  <AiOutlineClose size={20} color="white" />
                </button>
                <h3 className="text-xl text-ligthGray font-semibold">
                  {title}
                </h3>
              </div>

              {hasButtonOnTop && (
                <Button
                  label={buttonLabel || ""}
                  onClick={handleSubmit}
                  whiteStyle
                  disabled={disabled}
                />
              )}
            </div>
            <div className="modal_body">{body}</div>
            {!hasButtonOnTop && (
              <div className="modal_footer">
                <Button
                  label={buttonLabel || ""}
                  onClick={handleSubmit}
                  whiteStyle
                  large
                  fullWidth
                  disabled={disabled}
                />
                {footer}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
