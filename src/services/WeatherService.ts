import fs from "node:fs";
import {
  OpenWeatherCityInfo,
  WeatherData,
  WeatherResponse,
} from "../app/_ui/types";

const cityLookupList = JSON.parse(
  fs
    .readFileSync(process.cwd() + "/src/services/city.list.min.json")
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

async function getWeather(id: number | null): Promise<WeatherData | null> {
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
      if (resp.cod === "400") {
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

async function getSimplifiedWeatherData(
  city: string | null,
  state: string | null,
  country: string | null,
): Promise<WeatherResponse> {
  var promises = [getWeather(4155966)]; // Fort Lauderdale, FL

  const cityId = getCityId(city, state, country);
  if (cityId) {
    promises.push(getWeather(cityId));
  }

  const [myWeather, userWeather] = await Promise.all(promises);

  var response: WeatherResponse = {
    local: {},
    remington: {},
  } as WeatherResponse;

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

  return response;
}

export { getCityId, getWeather, getLocationString, getSimplifiedWeatherData };
