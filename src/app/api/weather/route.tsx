"use server";

import { NextResponse } from "next/server";
import { headers } from "next/headers";
import fs from "fs";

interface OpenWeatherApiGroupResponse {
  cnt: number;
  list: WeatherData[];
}

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

interface OpenWeatherCityInfo {
  id: bigint;
  name: string;
  state: string;
  country: string;
  coord: {
    lon: number;
    lat: number;
  };
}

const cityLookupList = JSON.parse(
  fs
    .readFileSync(process.cwd() + "/src/app/api/weather/city.list.min.json")
    .toString(),
);

function getCityId(
  city: string | null,
  state: string | null,
  country: string | null,
): number | null {
  if (city !== null && state !== null && country !== null) {
    const cityLookup = cityLookupList.find(
      (cityInfo: OpenWeatherCityInfo) =>
        cityInfo.name === city &&
        cityInfo.state === state &&
        cityInfo.country === country,
    );
    return cityLookup ? cityLookup.id : null;
  }
  return null;
}

async function getWeather(
  id: number | null,
): Promise<WeatherData | null> {
  try {
    if (process.env.OPEN_WEATHER_API_KEY) {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=${process.env.OPEN_WEATHER_API_KEY}&lang=en&id=${id}`,
        { next: { revalidate: 900 } },
      );

      if (!res.ok) {
        console.error("Failed to get weather data");
      }

      const resp = await res.json();
      if (resp.cod === '400') {
        console.error(`Error getting city data: ${resp.message}`);
        return null;
      }

      return resp;
    }
  } catch (e) {
    console.error(e);
  }
  return null;
}

function getLocationString(
  city: string | null,
  state: string | null,
  country: string | null,
): string {
  var returnStr = "";
  if (city) {
    returnStr += city;
  }
  if (state) {
    if (city) {
      returnStr += ", ";
    }
    returnStr += state;
  }
  if (country && (country !== "US" || (city === null && state === null))) {
    if (state) {
      returnStr += ", ";
    }
    returnStr += country;
  }

  return returnStr;
}

export async function GET(request: Request) {
  const headersList = request.headers;
  const city = headersList.get("Cf-Ipcity");
  const state = headersList.get("Cf-Region-Code");
  const country = headersList.get("Cf-Ipcountry");

  const myWeather = await getWeather(4155966); // Fort Lauderdale, FL
  const userWeather = await getWeather(getCityId(city, state, country));

  var response = { local: {}, remington: {} };

  if (myWeather) {
    response.remington = {
      location: "Fort Lauderdale, FL",
      temp: myWeather.main.temp,
      condition_desc: myWeather.weather[0].description,
      condition_id: myWeather.weather[0].id,
    };
  }

  if (userWeather) {
    response.local = {
      location: getLocationString(city, state, country),
      temp: userWeather.main.temp,
      condition_desc: userWeather.weather[0].description,
      condition_id: userWeather.weather[0].id,
    };
  }

  return NextResponse.json(response);
}
