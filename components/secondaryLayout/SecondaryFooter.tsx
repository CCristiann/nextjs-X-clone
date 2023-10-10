import React from "react";

import Link from "next/link";

import { secondaryFooterLinks } from "@/costants/costants";

const SecondaryFooter = () => {
  return (
    <footer className="relative mx-auto h-fit max-w-[1680px] md:flex md:items-center md:justify-center lg:h-[5vh]">
      <ul className="flex flex-wrap justify-center gap-x-5 p-3 md:p-1">
        {secondaryFooterLinks.map((link) => (
          <li key={link.label}>
            <Link
              className="w-full text-xs text-neutral-500 hover:underline"
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
