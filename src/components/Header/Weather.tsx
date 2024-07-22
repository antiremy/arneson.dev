import { useEffect, useState } from "react";
import { WeatherIcon } from 'weather-react-icons';

import 'weather-react-icons/lib/css/weather-icons.css';

interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: bigint;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: bigint;
    sunset: bigint;
  };
  timezone: bigint;
  id: bigint;
  name: string;
  cod: number;
}

interface WeatherProps {
  temp: number | undefined;
  condition_desc: string | undefined;
  condition_id: number | undefined;
}

export default function Weather(props: WeatherProps) {
  const [tempMouseOver, setTempMouseOver] = useState(false);

  return (
    <span className="flex flex-row items-center text-sm">
      <div>
        {props.condition_id && (
          <WeatherIcon name="owm" iconId={props.condition_id} className="mr-1 text-lg"/>
        )}
      </div>

      <span
        onMouseOver={() => setTempMouseOver(true)}
        onMouseOut={() => setTempMouseOver(false)}
      >
        {tempMouseOver
          ? `${
              props.temp ? Math.round(((props.temp - 32) * 5) / 9) : "--"
            }°C`
          : `${props.temp ? Math.round(props.temp) : "--"}°F`}
      </span>
      &nbsp;
      {props.condition_desc ? `and ${props.condition_desc}` : ""}
      &nbsp;
    </span>
  );
}
