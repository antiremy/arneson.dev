import React from "react";
import Footer from "./_ui/footer";
import Header from "./_ui/header";
import { getSimplifiedWeatherData } from "../services/WeatherService";
import { headers } from "next/headers";
import { PortfolioWrapper } from "./_ui/portfolioWrapper";

export default async function Page() {
  const headersList = await headers();
  const weatherResponse = await getSimplifiedWeatherData({
    city: headersList.get("Cf-Ipcity"),
    state: headersList.get("Cf-Region-Code"),
    country: headersList.get("Cf-Ipcountry"),
    latitude: headersList.get("Cf-Iplatitude"),
    longitude: headersList.get("Cf-Iplongitude"),
  });

  return (
    <>
      <div className="mt-6 lg:mt-auto">
        <Header weather={weatherResponse} />
      </div>
      <PortfolioWrapper />
      <div className="mt-auto">
        <Footer />
      </div>
    </>
  );
}
