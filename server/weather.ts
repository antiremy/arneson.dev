import type { IncomingHttpHeaders } from "node:http";
import type { WeatherData, WeatherResponse } from "../src/ui/types.ts";

// Fort Lauderdale, FL
const HOME_COORDS = { lat: 26.1224, lon: -80.1373 };

// Mirrors the 15 minute revalidation Next's fetch cache used to provide. The
// cap keeps a stream of distinct visitor coordinates from growing the map
// without bound; Map iteration order makes the first key the oldest entry.
const CACHE_TTL_MS = 15 * 60 * 1000;
const CACHE_MAX_ENTRIES = 1000;

// Promises are cached rather than results so concurrent requests for the same
// coordinates share a single upstream call.
const cache = new Map<
  string,
  { expires: number; weather: Promise<WeatherData | null> }
>();

interface RequestLocation {
  city: string | null;
  state: string | null;
  country: string | null;
  latitude: string | null;
  longitude: string | null;
}

function getWeather(lat: number, lon: number): Promise<WeatherData | null> {
  const key = `${lat},${lon}`;
  const now = Date.now();
  const cached = cache.get(key);
  if (cached && cached.expires > now) {
    return cached.weather;
  }

  const weather = fetchWeather(lat, lon);
  cache.delete(key);
  cache.set(key, { expires: now + CACHE_TTL_MS, weather });
  if (cache.size > CACHE_MAX_ENTRIES) {
    cache.delete(cache.keys().next().value!);
  }

  // Failures aren't cached, so the next request retries upstream.
  weather.then((data) => {
    if (!data && cache.get(key)?.weather === weather) {
      cache.delete(key);
    }
  });

  return weather;
}

async function fetchWeather(
  lat: number,
  lon: number,
): Promise<WeatherData | null> {
  if (!process.env.OPEN_WEATHER_API_KEY) {
    return null;
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=${process.env.OPEN_WEATHER_API_KEY}&lang=en&lat=${lat}&lon=${lon}`,
    );

    if (!res.ok) {
      console.error(`Failed to get weather data: ${res.status}`);
      return null;
    }

    const resp = await res.json();

    if (!resp?.main || !resp.weather?.[0]) {
      console.error(
        `Unexpected weather API response shape: ${JSON.stringify(resp)}`,
      );
      return null;
    }

    return resp;
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
      location:
        visitorName ||
        getLocationString(
          visitorWeather.name,
          null,
          visitorWeather.sys.country,
        ),
      temp: visitorWeather.main.temp,
      condition_desc: visitorWeather.weather[0].description,
      condition_id: visitorWeather.weather[0].id,
    };
  }

  return response;
}

// Cloudflare's visitor location headers; absent when running locally or when
// the "Add visitor location headers" managed transform is off.
function getRequestLocation(headers: IncomingHttpHeaders): RequestLocation {
  const get = (name: string) => {
    const value = headers[name];
    return (Array.isArray(value) ? value[0] : value) ?? null;
  };

  return {
    city: get("cf-ipcity"),
    state: get("cf-region-code"),
    country: get("cf-ipcountry"),
    latitude: get("cf-iplatitude"),
    longitude: get("cf-iplongitude"),
  };
}

export {
  getWeather,
  getLocationString,
  getRequestLocation,
  getSimplifiedWeatherData,
};
