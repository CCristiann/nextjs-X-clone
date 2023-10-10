"use client";

import React, { useCallback } from "react";
import { useRouter } from "next/navigation";

import Button from "./Button";
import Loader from "./Loader";

import { AiOutlineClose } from "react-icons/ai";

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
          <div className="h-[600px] w-full">
            <Loader />
          </div>
        ) : (
          <>
            <div
              className={`
          ${hasTransparentHeader && "sticky top-0 bg-black/40 backdrop-blur-md"}
          z-50 flex items-center justify-between px-3 py-1.5
        `}
            >
              <div className="flex items-center gap-2.5">
                <button
                  className="rounded-full p-3 transition hover:bg-slate-300 hover:bg-opacity-10"
                  onClick={handleClose}
                >
                  <AiOutlineClose size={20} color="white" />
                </button>
                <h3 className="text-xl font-semibold text-ligthGray">
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
