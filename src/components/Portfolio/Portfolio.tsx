import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Images from "./Images/Images.tsx";
import Section from "./Section.tsx";
import { useState } from "react";

const sections = [
  {
    title: "Rocket Mortgage",
    position: "Software Engineer II",
    subtitle: (
      <div className="text-xl">
        "Help everyone home" - America's Largest Online Mortgage Lender
      </div>
    ),
    dates: "Oct 2024 - Present",
    externalLink: "https://www.rocketmortgage.com/",
  },
  {
    title: "Ultimate Kronos Group",
    position: "Senior Software Engineer",
    subtitle: (
      <div className="text-xl">HR and workforce management solutions</div>
    ),
    dates: "Jun 2023 - Sep 2024",
    externalLink: "https://www.ukg.com/",
  },
  {
    title: "Monitr",
    position: "Founder & CEO",
    subtitle: <div className="text-xl">E-commerce monitoring for everyone</div>,
    dates: "Oct 2021 - Jun 2023",
    internalLink: "monitr",
    data: (
      <div
        className="text-md flex flex-col items-center space-y-4 px-4 pb-8 lg:text-sm"
        id="monitr"
      >
        <div className="flex w-full flex-row items-center justify-start pb-2 text-lg font-semibold">
          Monitr (2021-2023)
        </div>
        <div>
          After noticing how none of my friends knew when console restocks
          happened, I founded Monitr (formerly Monitr.gg) in 2021 to give access
          to high-quality e-commerce monitoring tools to anyone.
        </div>
        <div>
          Monitr was a platform that kept track of thousands of products across
          200+ websites. Monitr's goal was to help any user get any item they
          want, being developed during a time where PlayStation 5s were never in
          stock for more than a few seconds. This platform was extensible;
          setting up to allow new use-cases for this constant stream of product
          data.
        </div>

        <div className="grid grid-cols-2 place-items-center gap-2 px-0">
          <div className="col-span-2">{Images.MonitrPingsTable}</div>
          <div className="">{Images.MonitrSearchMobile}</div>
          <div>{Images.MonitrNotificationsMobile}</div>
        </div>

        <div>
          Monitr's users were notified of restocks and new products across push
          notifications (Android, iOS, browser), webhooks (Discord), and
          websockets within a second of it being detected. This resulted in
          successful checkouts for coveted shoes, gaming consoles, and graphics
          cards.
        </div>
      </div>
    ),
  },
  {
    title: "Wrath",
    position: "CTO & Developer",
    subtitle: (
      <div className="text-xl">Private checkout automation software</div>
    ),
    dates: "Feb 2018 - Jul 2021",
    internalLink: "wrath",
    data: (
      <>
        <div className="px-4 text-sm" id="wrath">
          <div className="flex flex-row items-center pb-2 text-lg font-semibold">
            Wrath (2018-2021)
          </div>
          <div className="pb-2">
            I partnered with another developer in 2018 to work on Wrath, an
            invite-only checkout automation software. I was bought out of Wrath
            in 2021.
          </div>
          <div className="pb-2">
            Wrath was an application created to do one thing: help users acquire
            high-demand shoes for retail price. What initially started out as
            just supporting Shopify-managed storefronts, grew to encompass any
            major website doing similar high-demand drops.
          </div>
          <div className="grid grid-cols-1 place-items-center gap-2 py-2">
            {Images.WrathDashboard}
            {Images.WrathTasks}
          </div>
          <div className="pt-2">
            Wrath has left an incredible mark on the e-commerce world with
            millions of checkouts (and declines) across hundreds of sites. It
            has continued to advance, retaining thousands of monthly active
            users.
          </div>
        </div>
      </>
    ),
  },
  {
    title: "Capital One",
    position: "Software Engineer",
    subtitle: (
      <div className="text-xl">
        "What's in your wallet?" - America's 4th Largest Credit Card Issuer
      </div>
    ),
    dates: "Aug 2018 - Nov 2020",
    externalLink: "https://www.capitalone.com/",
  },
];

interface PortfolioArgs {
  seeMore: boolean;
  setSeeMore: Function;
}

export default function Portfolio(opts: PortfolioArgs) {
  const {seeMore, setSeeMore} = opts

  return (
    <>
      <div
        className={`lg:duration-500 z-30 mx-auto mt-6 grid grid-flow-row gap-6 lg:grid-cols-2 lg:transition-[max-height] ${seeMore ? "lg:max-h-[56rem]" : "lg:max-h-[28rem] overflow-hidden"}`}
      >
        {sections.map((section, i) => (
          <div key={i} className={`lg:transition-[max-height] lg:transition-[opacity] lg:duration-300 ${i < 4 || seeMore ? "lg:opacity-1" : "lg:opacity-0"}`}>
            <Section
              title={section.title}
              subtitle={section.subtitle}
              position={section.position}
              data={section.data}
              dates={section.dates}
              externalLink={section.externalLink}
              internalLink={section.internalLink}
              key={i}
            />
          </div>
        ))}
      </div>
      <div className="w-full text-center pt-2">
        <a
          className="invisible w-full text-center lg:visible lg:mb-6"
          onClick={() => setSeeMore(!seeMore)}
        >
          <FontAwesomeIcon
            className="text-l"
            icon={seeMore ? faArrowUp : faArrowDown}
          />
          {seeMore ? " See Less" : " See More"}
        </a>
      </div>
    </>
  );
}
