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
        After noticing how none of my friends knew when console restocks
        happened, I founded Monitr (formerly Monitr.gg) in 2021 to give access
        to high-quality e-commerce monitoring tools to anyone.
      </div>
      <div>
        Monitr was a platform that kept track of thousands of products across
        200+ websites. Monitr's goal was to help any user get any item they
        want, being developed during a time where PlayStation 5s were never in
        stock for more than a few seconds. This platform was extensible; setting
        up to allow new use-cases for this constant stream of product data.
      </div>

      <div className="grid grid-cols-2 place-items-center gap-2 px-0 py-2">
        <div className="col-span-2">{Images.MonitrPingsTable}</div>
        <div className="place-self-end">{Images.MonitrSearchMobile}</div>
        <div className="place-self-start">
          {Images.MonitrNotificationsMobile}
        </div>
      </div>

      <div>
        Monitr's users were notified of restocks and new products across push
        notifications (Android, iOS, browser), webhooks (Discord), and
        websockets within a second of it being detected. This resulted in
        successful checkouts for coveted shoes, gaming consoles, and graphics
        cards.
      </div>
    </div>
  );
}
