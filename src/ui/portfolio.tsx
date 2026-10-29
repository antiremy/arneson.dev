import Section from "./section.tsx";
import { experiences } from "./experience.tsx";

export default function Portfolio() {
  return (
    <div
      id="portfolio-list"
      className="z-30 mx-auto grid grid-flow-row gap-6 lg:grid-cols-2"
    >
      {experiences.map((section) => (
        <Section
          key={section.title}
          title={section.title}
          subtitle={section.subtitle}
          position={section.roles[0].title}
          dates={section.dates}
          link={section.link}
        />
      ))}
    </div>
  );
}
