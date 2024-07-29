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
        .catch((error) => {});
  }, []);

  useEffect(() => {
    mouseOver && weather?.local?.temp
      ? setCurrent(weather.local)
      : setCurrent(weather?.remington);
  }, [weather, mouseOver]);

  return (
    <header className="justify-center items-center">
      <div className="text-4xl font-bold lg:text-6xl text-center">
        Remington Arneson
      </div>
      <div
        onMouseOver={() => setMouseOver(true)}
        onMouseOut={() => setMouseOver(false)}
      >
        <div className="flex justify-center items-center space-x-3 pt-4 text-md lg:text-lg">
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
        <div className="flex justify-center items-center flex-col text-sm">
          <Clock mouseOver={mouseOver} />
        </div>
      </div>

      <div className="text-2xl flex justify-center mt-4 text-emerald-600">
        <a href="mailto:remy@arneson.dev" data-umami-event="Email link">remy@arneson.dev</a>
      </div>
      <div className="mt-4 block lg:hidden lg:mt-0">
        <ExternalLinks />
      </div>
    </header>
  );
}
