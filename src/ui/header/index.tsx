import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Clock from "./clock.tsx";
import Weather from "./weather.tsx";
import ExternalLinks from "../externalLinks.tsx";
import type { SimplifiedWeatherData, WeatherResponse } from "../types.ts";

interface HeaderProps {
  // null until /api/weather responds.
  weather: WeatherResponse | null;
}

export default function Header({ weather }: HeaderProps) {
  const [mouseOver, setMouseOver] = useState(false);

  const current: SimplifiedWeatherData | undefined =
    mouseOver && weather?.local ? weather.local : weather?.remington;

  return (
    <header className="items-center justify-center">
      <h1 className="text-center text-4xl font-bold lg:text-6xl">
        Remington Arneson
      </h1>
      <div
        tabIndex={0}
        onMouseOver={() => setMouseOver(true)}
        onMouseOut={() => setMouseOver(false)}
        onFocus={() => setMouseOver(true)}
        onBlur={() => setMouseOver(false)}
        className="pb-4"
      >
        {/* Kept in the layout but hidden until /api/weather responds, so
            nothing shifts when the weather arrives after the first paint. */}
        <div
          className={`text-md flex w-full justify-center space-x-3 pt-4 text-sm ${
            weather ? "motion-safe:animate-fade-in" : "invisible"
          }`}
        >
          <div>
            <FontAwesomeIcon className="lg:text-lg" icon={faLocationDot} />
            &nbsp;{current?.location}
          </div>

          <Weather
            temp={current?.temp}
            condition_desc={current?.condition_desc}
            condition_id={current?.condition_id}
          />
        </div>
        <div className="flex flex-col items-center justify-center text-sm">
          <Clock mouseOver={mouseOver} />
        </div>
      </div>

      <div className="mt-2 flex justify-center text-2xl text-emerald-600">
        <a href="mailto:remington@arneson.dev" data-umami-event="Email link">
          remington@arneson.dev
        </a>
      </div>
      <div className="mt-2 block lg:mt-0 lg:hidden">
        <ExternalLinks />
      </div>
    </header>
  );
}
