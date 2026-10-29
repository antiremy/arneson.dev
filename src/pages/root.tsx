import { useEffect, ViewTransition } from "react";
import { Outlet, useMatches } from "react-router";
import { pageTitle, type PageMeta } from "../metadata";

export default function Root() {
  const matches = useMatches();
  const meta = matches.at(-1)?.handle as PageMeta | undefined;

  // The prerendered <head> covers the first load; this keeps the tab title in
  // step on client-side navigations.
  useEffect(() => {
    if (meta) document.title = pageTitle(meta);
  }, [meta]);

  // React Router runs navigations in a transition, so this boundary
  // cross-fades the whole page between routes.
  return (
    <ViewTransition>
      <Outlet />
    </ViewTransition>
  );
}
