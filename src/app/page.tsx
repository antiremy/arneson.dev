"use server";

import React from "react";
import { ThemeProvider } from "next-themes";
import Footer from "./_ui/footer";
import Header from "./_ui/header";
import { getSimplifiedWeatherData } from "../services/WeatherService";
import { headers } from "next/headers";
import { PortfolioWrapper } from "./_ui/portfolioWrapper";

export default async function Page() {
  const headersList = await headers();
  const city = headersList.get("Cf-Ipcity");
  const state = headersList.get("Cf-Region-Code");
  const country = headersList.get("Cf-Ipcountry");
  const weatherResponse = await getSimplifiedWeatherData(city, state, country);

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
