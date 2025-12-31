"use client";

import { useEffect } from "react";
import { usePageData } from "../../../context/pageDataContext";
import Images from "../../_ui/images";
import { StickyTitle } from "../_ui/stickyTitle";

export default function Page() {
  const { setTitle } = usePageData();

  useEffect(() => {
    setTitle("Wrath (2018-2021)");
  }, []);

  return (
    <div id="wrath" className="flex flex-col gap-2 pt-4 pb-12">
      <div>
        I partnered with another developer in 2018 to work on Wrath, an
        invite-only checkout automation software. I was bought out of Wrath in
        2021.
      </div>
      <div>
        Wrath was an application created to do one thing: help users acquire
        high-demand shoes for retail price. What initially started out as a
        Chrome extension supporting Shopify-managed storefronts, grew to
        encompass any major website doing similar high-demand drops.
      </div>
      <div className="grid grid-cols-1 place-items-center gap-2">
        {Images.WrathDashboard}
        {Images.WrathTasks}
      </div>
      <div>
        Wrath has left an incredible mark on the e-commerce world with millions
        of checkouts (and declines) across hundreds of sites. It has continued
        to advance, retaining thousands of monthly active users.
      </div>
    </div>
  );
}
