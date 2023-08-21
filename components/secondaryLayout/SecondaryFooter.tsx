import React from "react";

import Link from "next/link";

import { secondaryFooterLinks } from "@/costants/costants";

const SecondaryFooter = () => {
  return (
    <footer className="relative max-w-[1680px] mx-auto h-fit lg:h-[5vh] md:flex md:justify-center md:items-center">
      <ul className="flex justify-center flex-wrap gap-x-5 p-3 md:p-1">
        {secondaryFooterLinks.map((link) => (
          <li key={link.label}>
            <Link
              className="text-neutral-500 text-xs hover:underline w-full"
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default SecondaryFooter;
