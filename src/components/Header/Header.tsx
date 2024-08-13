import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Clock from "./Clock.tsx";
import Weather from "./Weather.tsx";
import ExternalLinks from "../ExternalLinks.tsx";

interface WeatherResponse {
  local: WeatherData | undefined;
  remington: WeatherData;
}

interface WeatherData {
  location: string;
  temp: number;
  condition_desc: string;
  condition_id: number;
}

export default function Header() {
  const [weather, setWeather] = useState<WeatherResponse>();
  const [current, setCurrent] = useState<WeatherData>();
  const [mouseOver, setMouseOver] = useState(false);

  useEffect(() => {
    !weather &&
      fetch("/api/weather")
        .then(async (resp) => {
          if (resp.status === 200) {
            var data = await resp.json();
            setWeather(data);
          }
        })
        .catch((error) => {
          console.error("Error fetching weather:", error);
        });
  }, []);

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
      >
        <div className="text-md flex justify-center space-x-3 pt-4 lg:text-lg w-full">
          <div>
            <FontAwesomeIcon icon={faLocationDot} />
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

      <div className="mt-4 flex justify-center text-2xl text-emerald-600">
        <a href="mailto:remy@arneson.dev" data-umami-event="Email link">
          remy@arneson.dev
        </a>
      </div>
      <div className="mt-4 block lg:mt-0 lg:hidden">
        <ExternalLinks />
      </div>
    </header>
  );
}
