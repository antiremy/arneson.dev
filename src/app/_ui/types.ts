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

interface WeatherResponse {
  local: SimplifiedWeatherData | undefined;
  remington: SimplifiedWeatherData;
}

interface SimplifiedWeatherData {
  location: string;
  temp: number;
  condition_desc: string;
  condition_id: number;
}

export type {
  OpenWeatherApiGroupResponse,
  WeatherData,
  OpenWeatherCityInfo,
  WeatherResponse,
  SimplifiedWeatherData,
};
