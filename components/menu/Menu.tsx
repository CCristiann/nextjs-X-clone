"use client";
import React, { useRef, useCallback, ReactNode } from "react";

type MenuProps = {
  children: ReactNode;
  isOpen?: boolean;
  setIsOpen: () => void;
  userWidget?: boolean;
  tweetMenu?: boolean;
};
const Menu: React.FC<MenuProps> = ({
  children,
  isOpen,
  setIsOpen,
  userWidget,
  tweetMenu,
}) => {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  const onClose = useCallback(() => {
    setIsOpen();
  }, [isOpen]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();

      if (e.target === overlay.current && onClose) {
        console.log("test");
        onClose();
      }
    },
    [onClose, overlay],
  );

  if (isOpen)
    return (
      <>
        <div
          ref={overlay}
          onClick={handleOverlayClick}
          className="fixed top-0 left-0 h-screen w-screen hover:cursor-default"
        />
        <div
          ref={wrapper}
          className={`
      ${userWidget && "bottom-20 py-5"}
      ${tweetMenu && "top-0 right-0"}
      absolute w-fit h-fit rounded-xl bg-black shadow-sm shadow-white z-40
    `}
        >
          {children}
        </div>
      </>
    );
};

export default Menu;
