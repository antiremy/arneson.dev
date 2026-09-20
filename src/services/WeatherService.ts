import { WeatherData, WeatherResponse } from "../app/_ui/types";

// Fort Lauderdale, FL
const HOME_COORDS = { lat: 26.1224, lon: -80.1373 };

interface RequestLocation {
  city: string | null;
  state: string | null;
  country: string | null;
  latitude: string | null;
  longitude: string | null;
}

async function getWeather(
  lat: number,
  lon: number,
): Promise<WeatherData | null> {
  if (!process.env.OPEN_WEATHER_API_KEY) {
    return null;
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=${process.env.OPEN_WEATHER_API_KEY}&lang=en&lat=${lat}&lon=${lon}`,
      { next: { revalidate: 900 } },
    );

    if (!res.ok) {
      console.error(`Failed to get weather data: ${res.status}`);
      return null;
    }

    return await res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}

function getLocationString(
  city: string | null,
  state: string | null,
  country: string | null,
): string {
  let returnStr = "";
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
    if (returnStr) {
      returnStr += ", ";
    }
    returnStr += country;
  }

  return returnStr;
}

function parseCoords(
  latitude: string | null,
  longitude: string | null,
): { lat: number; lon: number } | null {
  if (!latitude || !longitude) {
    return null;
  }

  const lat = Number(latitude);
  const lon = Number(longitude);

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return null;
  }
  if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    return null;
  }

  return { lat, lon };
}

async function getSimplifiedWeatherData(
  location: RequestLocation,
): Promise<WeatherResponse> {
  const visitorCoords = parseCoords(location.latitude, location.longitude);
  const visitorName = getLocationString(
    location.city,
    location.state,
    location.country,
  );

  const [myWeather, visitorWeather] = await Promise.all([
    getWeather(HOME_COORDS.lat, HOME_COORDS.lon),
    visitorCoords ? getWeather(visitorCoords.lat, visitorCoords.lon) : null,
  ]);

  const response: WeatherResponse = {
    local: undefined,
    remington: undefined,
  };

  if (myWeather) {
    response.remington = {
      location: "Fort Lauderdale, FL",
      temp: myWeather.main.temp,
      condition_desc: myWeather.weather[0].description,
      condition_id: myWeather.weather[0].id,
    };
  }

  if (visitorWeather) {
    response.local = {
      location: visitorName,
      temp: visitorWeather.main.temp,
      condition_desc: visitorWeather.weather[0].description,
      condition_id: visitorWeather.weather[0].id,
    };
  }

  return response;
}

export { getWeather, getLocationString, getSimplifiedWeatherData };
