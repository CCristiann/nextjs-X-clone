"use client";
import React, { useRef, useCallback, ReactNode } from "react";

type MenuProps = {
  children: ReactNode;
  isOpen?: boolean;
  setIsOpen: () => void;
  userWidget?: boolean;
  tweetMenu?: boolean;
  headerMenu?: boolean;
};
const Menu: React.FC<MenuProps> = ({
  children,
  isOpen,
  setIsOpen,
  userWidget,
  tweetMenu,
  headerMenu,
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
          className="fixed left-0 top-0 h-screen w-screen hover:cursor-default"
        />
        <div
          ref={wrapper}
          className={`
      ${userWidget && "bottom-20 py-5"}
      ${tweetMenu && "right-0 top-0"}
      ${headerMenu && "left-6 top-16"}
      absolute z-40 h-fit w-fit rounded-xl bg-black shadow-sm shadow-white
    `}
        >
          {children}
        </div>
      </>
    );
};

export default Menu;
