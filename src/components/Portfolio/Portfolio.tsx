import Images from "./Images/Images.tsx";
import Section from "./Section.tsx";

const sections = [
  {
    title: "Ultimate Kronos Group",
    position: "Senior Software Engineer",
    subtitle: "HR and workforce management solutions",
    dates: "Jun 2023 - Present",
    externalLink: "https://www.ukg.com/",
  },
  {
    title: "Monitr",
    position: "Founder & CEO",
    subtitle: "E-commerce monitoring for everyone",
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
    subtitle: "Private checkout automation software",
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
    subtitle:
      "\"What's in your wallet?\" - America's 4th Largest Credit Card Issuer",
    dates: "Aug 2018 - Nov 2020",
    externalLink: "https://www.capitalone.com/",
  },
];

export default function Portfolio() {
  return (
    <div className="z-30 mx-auto mt-6 grid grid-flow-row gap-6 lg:grid-cols-2">
      {sections.map((section, i) => (
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
      ))}
    </div>
  );
}
