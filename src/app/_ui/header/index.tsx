"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Clock from "./clock.tsx";
import Weather from "./weather.tsx";
import ExternalLinks from "../externalLinks.tsx";
import { SimplifiedWeatherData, WeatherResponse } from "../types.ts";

interface HeaderProps {
  weather: WeatherResponse;
}

export default function Header({ weather }: HeaderProps) {
  const [current, setCurrent] = useState<SimplifiedWeatherData>();
  const [mouseOver, setMouseOver] = useState(false);

  useEffect(() => {
    mouseOver && weather?.local?.temp
      ? setCurrent(weather.local)
      : setCurrent(weather?.remington);
  }, [weather, mouseOver]);

  return (
    <header className="items-center justify-center">
      <div className="text-center text-4xl font-bold lg:text-6xl">
        Remington Arneson
      </div>
      <div
        onMouseOver={() => setMouseOver(true)}
        onMouseOut={() => setMouseOver(false)}
        className="pb-4"
      >
        <div className="text-md flex w-full justify-center space-x-3 pt-4 text-sm">
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
