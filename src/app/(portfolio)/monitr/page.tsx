"use client";

import { useEffect } from "react";
import { usePageData } from "../../../context/pageDataContext";
import Images from "../../_ui/images";
import { StickyTitle } from "../_ui/stickyTitle";

export default function Page() {
  const { setTitle } = usePageData();

  useEffect(() => {
    setTitle("Monitr (2021-2023)");
  }, []);

  return (
    <div id="monitr" className="flex flex-col gap-2 pt-4 pb-12">
      <div>
        When I watched my friends constantly miss PlayStation 5 restocks, I saw
        an opportunity to level the playing field. In 2021, I founded Monitr
        (formerly Monitr.gg) to democratize access to enterprise-grade product
        monitoring.
      </div>

      <div>
        Monitr tracked inventory across 200+ retailers in real-time, monitoring
        thousands of products simultaneously. Built during the peak of the
        pandemic supply shortage (when PS5s sold out in seconds), the platform
        helped everyday shoppers compete with bot networks and resellers. The
        architecture was designed for speed and extensibility.
      </div>

      <div className="grid grid-cols-2 place-items-center gap-2 px-0 py-2">
        <div className="col-span-2">{Images.MonitrPingsTable}</div>
        <div className="place-self-end">{Images.MonitrSearchMobile}</div>
        <div className="place-self-start">
          {Images.MonitrNotificationsMobile}
        </div>
      </div>

      <div>
        Sub-second detection fed a multi-channel notification system: native
        push notifications (iOS, Android, web), Discord webhooks, and WebSocket
        streams. This real-time pipeline turned scarcity into opportunity,
        helping users successfully purchase hard-to-find sneakers, gaming
        consoles, and graphics cards. Beyond restocks, Monitr's infrastructure
        was built to scale to new use cases, turning a constant stream of
        e-commerce data into actionable intelligence for anyone willing to act
        fast.
      </div>
    </div>
  );
}
