"use client";

import { useEffect, useState } from "react";

import "./clock.css";

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

export default function Clock(props: { mouseOver: boolean }) {
  const [now, setNow] = useState(
    new Date(new Date().toLocaleString("en", { timeZone: "America/New_York" })),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      let d;
      if (props.mouseOver) {
        d = new Date();
      } else {
        d = new Date(
          new Date().toLocaleString("en", { timeZone: "America/New_York" }),
        );
      }

      setNow(d);
    }, 100);

    return () => clearInterval(interval);
  }, [props.mouseOver]);

  function nth(d: number) {
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

  function isDST(d: Date) {
    let jan = new Date(d.getFullYear(), 0, 1).getTimezoneOffset();
    let jul = new Date(d.getFullYear(), 6, 1).getTimezoneOffset();
    return Math.max(jan, jul) !== d.getTimezoneOffset();
  }

  function getDate() {
    return `${months[now.getMonth()]} ${now.getDate()}${nth(
      now.getDate(),
    )}, ${now.getFullYear()}`;
  }

  function getTimeString() {
    return (
      <>
        <span
          suppressHydrationWarning
          className="inline-block max-w-[56px] min-w-[56px]"
        >
          {`${(now.getHours() > 12 ? now.getHours() % 12 : now.getHours())
            .toString()
            .padStart(2, "0")}:${now
            .getMinutes()
            .toString()
            .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`}
        </span>
        &nbsp;
        {now.getHours() >= 12 ? "PM " : "AM "}
        {props.mouseOver
          ? now.toLocaleString("en", { timeZoneName: "short" }).split(" ").pop()
          : isDST(now)
            ? "EDT"
            : "EST"}
      </>
    );
  }

  function getHourHand() {
    return now.getHours() * 30 + now.getMinutes() / 2;
  }

  function getMinuteHand() {
    return now.getMinutes() * 6;
  }

  function getSecondHand() {
    return now.getSeconds() * 6;
  }

  return (
    <div className="mt-1 flex flex-row items-center">
      <div className="animate relative mr-1 size-5 rounded-[100px] border border-black bg-white dark:border-0">
        <div
          className="hour"
          suppressHydrationWarning
          style={{
            transform: `rotate(${getHourHand()}deg)`,
            transition: getHourHand() === 0 ? "all 0.0s" : "transform .95s",
          }}
        ></div>
        <div
          className="minute"
          suppressHydrationWarning
          style={{
            transform: `rotate(${getMinuteHand()}deg)`,
            transition: getMinuteHand() === 0 ? "all 0.0s" : "transform .95s",
          }}
        ></div>
        <div
          className="second"
          suppressHydrationWarning
          style={{
            transform: `rotate(${getSecondHand()}deg)`,
            transition: getSecondHand() === 0 ? "all 0.0s" : "transform .95s",
          }}
        ></div>
      </div>
      <div suppressHydrationWarning>
        {getDate()} • {getTimeString()}
      </div>
    </div>
  );
}
