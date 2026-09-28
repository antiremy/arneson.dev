import { type JSX } from "react";

export interface Role {
  title: string;
  dates: string;
}

export interface Experience {
  title: string;
  subtitle: JSX.Element;
  // Tenure at the company as a whole; individual role dates live in `roles`.
  dates: string;
  link: string;
  // Newest first. The card view only shows the first (current/last) role.
  roles: Role[];
}

export const experiences: Experience[] = [
  {
    title: "Rocket",
    subtitle: (
      <div className="text-xl">
        {'"Help everyone home" - Servicing one in six mortgages in America'}
      </div>
    ),
    dates: "Oct 2024 - Present",
    link: "https://www.rocket.com/",
    roles: [
      { title: "Senior Software Engineer I", dates: "Aug 2026 - Present" },
      { title: "Software Engineer II", dates: "Oct 2024 - Aug 2026" },
    ],
  },
  {
    title: "Ultimate Kronos Group",
    subtitle: (
      <div className="text-xl">HR and workforce management solutions</div>
    ),
    dates: "Jun 2023 - Sep 2024",
    link: "https://www.ukg.com/",
    roles: [
      { title: "Senior Software Engineer", dates: "Jun 2023 - Sep 2024" },
    ],
  },
  {
    title: "Monitr",
    subtitle: <div className="text-xl">E-commerce monitoring for everyone</div>,
    dates: "Oct 2021 - Jun 2023",
    link: "/monitr",
    roles: [{ title: "Founder & CEO", dates: "Oct 2021 - Jun 2023" }],
  },
  {
    title: "Wrath",
    subtitle: (
      <div className="text-xl">Private checkout automation software</div>
    ),
    dates: "Feb 2018 - Jul 2021",
    link: "/wrath",
    roles: [{ title: "CTO & Developer", dates: "Feb 2018 - Jul 2021" }],
  },
  {
    title: "Capital One",
    subtitle: (
      <div className="text-xl">
        {`"What's in your wallet?" - America's 4th Largest Credit Card Issuer`}
      </div>
    ),
    dates: "Aug 2018 - Nov 2020",
    link: "https://www.capitalone.com/",
    roles: [
      { title: "Software Engineer", dates: "Aug 2019 - Nov 2020" },
      { title: "Data Analyst", dates: "Aug 2018 - Aug 2019" },
    ],
  },
];
