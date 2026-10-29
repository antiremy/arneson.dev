import { useEffect, useState } from "react";
import Footer from "../ui/footer";
import Header from "../ui/header";
import { PortfolioWrapper } from "../ui/portfolioWrapper";
import type { WeatherResponse } from "../ui/types";

const NO_WEATHER: WeatherResponse = { local: undefined, remington: undefined };

export default function Home() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    // Served by server/index.ts, which keeps the OpenWeather key server-side
    // and reads the visitor's location from Cloudflare's request headers.
    fetch("/api/weather", { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : NO_WEATHER))
      .catch(() => NO_WEATHER)
      .then((data: WeatherResponse) => {
        if (!controller.signal.aborted) setWeather(data);
      });

    return () => controller.abort();
  }, []);

  return (
    <>
      <div className="mt-6 lg:mt-auto">
        <Header weather={weather} />
      </div>
      <PortfolioWrapper />
      <div className="mt-auto">
        <Footer />
      </div>
    </>
  );
}
