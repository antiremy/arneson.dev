import React, { ReactNode } from "react";

interface PageLinkProps {
  href: string;
  label: string;
  current: boolean;
}

const CURRENT_PAGE =
  "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white";
const OTHER_PAGE =
  "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white";

export default function PageLink(props: PageLinkProps): JSX.Element {
  return (
    <a
      href={props.href}
      className={props.current ? CURRENT_PAGE : OTHER_PAGE}
    >
      {props.label}
    </a>
  );
}
