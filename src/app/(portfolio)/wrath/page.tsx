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
        In 2018, I joined Wrath as an early partner—an invite-only checkout
        automation platform that redefined how sneakerheads acquired limited
        releases. I exited the company in 2021.
      </div>
      <div>
        Wrath solved a singular problem: securing high-demand sneakers at retail
        price before they sold out. What began as a Chrome extension targeting
        Shopify storefronts evolved into a sophisticated automation suite
        supporting every major retailer running limited drops.
      </div>
      <div className="grid grid-cols-1 place-items-center gap-2">
        {Images.WrathDashboard}
        {Images.WrathTasks}
      </div>
      <div>
        The platform processed millions of checkout attempts across hundreds of
        sites, becoming a defining force in the streetwear and sneaker resale
        economy. Wrath operated until October 2023, maintaining thousands of
        active subscribers throughout its run.
      </div>
    </div>
  );
}
