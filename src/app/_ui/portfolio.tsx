import Section from "./section.tsx";

const sections = [
  {
    title: "Rocket",
    position: "Software Engineer II",
    subtitle: (
      <div className="text-xl">
        "Help everyone home" - Servicing one in six mortgages in America
      </div>
    ),
    dates: "Oct 2024 - Present",
    link: "https://www.rocket.com/",
  },
  {
    title: "Ultimate Kronos Group",
    position: "Senior Software Engineer",
    subtitle: (
      <div className="text-xl">HR and workforce management solutions</div>
    ),
    dates: "Jun 2023 - Sep 2024",
    link: "https://www.ukg.com/",
  },
  {
    title: "Monitr",
    position: "Founder & CEO",
    subtitle: <div className="text-xl">E-commerce monitoring for everyone</div>,
    dates: "Oct 2021 - Jun 2023",
    link: "/monitr",
  },
  {
    title: "Wrath",
    position: "CTO & Developer",
    subtitle: (
      <div className="text-xl">Private checkout automation software</div>
    ),
    dates: "Feb 2018 - Jul 2021",
    link: "/wrath",
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
    link: "https://www.capitalone.com/",
  },
];

interface PortfolioArgs {
  seeMore: boolean;
  setSeeMore: Function;
}

export default function Portfolio(opts: PortfolioArgs) {
  const { seeMore } = opts;

  return (
    <div
      className={`z-30 mx-auto mt-6 grid grid-flow-row gap-6 lg:grid-cols-2 lg:transition-[max-height] lg:duration-500 ${seeMore ? "lg:max-h-224" : "overflow-hidden lg:max-h-112"}`}
    >
      {sections.map((section, i) => (
        <div
          key={i}
          className={`lg:transition-opacity lg:duration-300 ${i < 4 || seeMore ? "lg:opacity-100" : "lg:opacity-0"}`}
        >
          <Section
            title={section.title}
            subtitle={section.subtitle}
            position={section.position}
            dates={section.dates}
            link={section.link}
            key={i}
          />
        </div>
      ))}
    </div>
  );
}
