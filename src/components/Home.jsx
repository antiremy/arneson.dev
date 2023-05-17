import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Home() {
  const navigate = useNavigate();
  const [weather, setWeather] = useState();
  const [tempMouseOver, setTempMouseOver] = useState(false);
  const [dateMouseOver, setDateMouseOver] = useState(false);
  const [now, setNow] = useState(
    new Date(new Date().toLocaleString("en", { timeZone: "America/New_York" }))
  );

  useEffect(() => {
    !weather &&
      axios({
        method: "get",
        url: "https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=1fa2e43a29b0c85a4bc5943faa622c13&lang=en&q=Fort%20Lauderdale",
        responseType: "json",
      })
        .then((resp) => {
          if (resp.status === 200) {
            setWeather(resp.data);
          }
        })
        .catch((error) => {});
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      let d;
      if (dateMouseOver) {
        d = new Date();
      } else {
        d = new Date(
          new Date().toLocaleString("en", { timeZone: "America/New_York" })
        );
      }

      setNow(d);
    }, 1000);

    return () => clearInterval(interval);
  }, [dateMouseOver]);

  function nth(d) {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  function isDST(d) {
    let jan = new Date(d.getFullYear(), 0, 1).getTimezoneOffset();
    let jul = new Date(d.getFullYear(), 6, 1).getTimezoneOffset();
    return Math.max(jan, jul) !== d.getTimezoneOffset();
  }

  return (
    <div className="w-full justify-center flex flex-wrap mt-20">
      <Helmet>
        <title>Home | Remington</title>
      </Helmet>
      <div className="lg:w-1/2 max-w-xl">
        <div className="flex flex-col justify-top">
          <div className="text-2xl font-bold font-white">
            Hi, I'm Remington.
          </div>
          <span className="text-base pt-4 text-white opacity-80">
            I'm a software developer from the US. I'm particularly
            interested in the ways technology and automation can make lives
            easier.
          </span>
          <span className="text-base pt-6 text-white opacity-80 flex flex-row items-center">
            {weather && (
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                className="w-[40px] h-[40px]"
              />
            )}
            <span
              onMouseOver={() => setTempMouseOver(true)}
              onMouseOut={() => setTempMouseOver(false)}
            >
              {tempMouseOver
                ? `${
                    weather
                      ? Math.round(((weather.main.temp - 32) * 5) / 9)
                      : "--"
                  }°C`
                : `${weather ? Math.round(weather.main.temp) : "--"}°F`}
            </span>
            &nbsp;in Fort Lauderdale
          </span>
          <span
            className="text-base text-white opacity-80 flex flex-row items-center"
            onMouseOver={() => {
              setDateMouseOver(true);
              setNow(new Date());
            }}
            onMouseOut={() => {
              setDateMouseOver(false);
              setNow(
                new Date(
                  new Date().toLocaleString("en", {
                    timeZone: "America/New_York",
                  })
                )
              );
            }}
          >
            <div className="clock">
              <div
                className="hour"
                style={{
                  transform: `rotate(${
                    now.getHours() * 30 + now.getMinutes() / 2
                  }deg)`,
                }}
              ></div>
              <div
                className="minute"
                style={{
                  transform: `rotate(${now.getMinutes() * 6}deg)`,
                }}
              ></div>
              <div
                className="second"
                style={{
                  transform: `rotate(${now.getSeconds() * 6}deg)`,
                }}
              ></div>
            </div>
            {`${months[now.getMonth()]} ${now.getDate()}${nth(
              now.getDate()
            )}, ${now.getFullYear()} • ${(now.getHours() > 12 ? now.getHours() % 12 : now.getHours())
              .toString()
              .padStart(2, "0")}:${now
              .getMinutes()
              .toString()
              .padStart(2, "0")}:${now
              .getSeconds()
              .toString()
              .padStart(2, "0")} ${now.getHours() >= 12 ? "PM" : "AM"} ${
              dateMouseOver
                ? now
                    .toLocaleString("en", { timeZoneName: "short" })
                    .split(" ")
                    .pop()
                : isDST(now)
                ? "EDT"
                : "EST"
            }`}
          </span>
        </div>
        <div className="pt-6">
          <div className="text-lg font-semibold pt-4 text-white opacity-50 mb-4">
            My work
          </div>
          <div
            className="w-full bg-white/10 hover:bg-white/25 hover:cursor-pointer transition rounded-lg p-2 mt-2"
            onClick={() => navigate("/portfolio#monitr")}
          >
            <div className="text-sm font-semibold">Monitr</div>
            <div className="text-xs text-white/50">
              E-commerce monitoring for everyone
            </div>
          </div>
          <div
            className="w-full bg-white/10 hover:bg-white/25 hover:cursor-pointer transition rounded-lg p-2 mt-2"
            onClick={() => navigate("/portfolio#wrath")}
          >
            <div className="text-sm font-semibold">Wrath</div>
            <div className="text-xs text-white/50">
              Private checkout automation software
            </div>
          </div>
          {/* <div className="w-full bg-white/10 rounded-md p-2 mt-2">
            <div className="text-sm font-semibold">Monitr</div>
            <div className="text-xs text-white/50">Product monitoring for everyone</div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
