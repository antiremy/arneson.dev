"use client";

import { useEffect, useState } from "react";

import "./clock.css";

const HOME_TIME_ZONE = "America/New_York";

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

// Only two timeZone values are ever passed in (home vs. the visitor's), so
// caching the formatter avoids rebuilding it on every render of a
// once-per-second tick.
const formatterCache = new Map<string, Intl.DateTimeFormat>();

function getFormatter(timeZone: string | undefined): Intl.DateTimeFormat {
  const key = timeZone ?? "";
  let formatter = formatterCache.get(key);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hourCycle: "h23",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    });
    formatterCache.set(key, formatter);
  }
  return formatter;
}

// Reads the wall-clock fields for `date` as they appear in `timeZone`, rather
// than round-tripping through a locale string, which relies on non-standard
// Date parsing and cannot report the target zone's DST state.
function getZonedParts(date: Date, timeZone: string | undefined) {
  const parts = getFormatter(timeZone).formatToParts(date);

  const find = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return {
    month: find("month"),
    day: Number(find("day")),
    year: find("year"),
    hours: Number(find("hour")),
    minutes: Number(find("minute")),
    seconds: Number(find("second")),
    timeZoneName: find("timeZoneName"),
  };
}

export default function Clock(props: { mouseOver: boolean }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    // Re-render once per second, aligned to the next second boundary, instead
    // of polling every 100ms for a value that only changes 1x/sec.
    const tick = () => {
      const date = new Date();
      setNow(date);
      timeout = setTimeout(tick, 1000 - (date.getTime() % 1000));
    };

    timeout = setTimeout(tick, 1000 - (Date.now() % 1000));

    return () => clearTimeout(timeout);
  }, []);

  // Hovering swaps the display from Remington's time to the visitor's own.
  const { month, day, year, hours, minutes, seconds, timeZoneName } =
    getZonedParts(now, props.mouseOver ? undefined : HOME_TIME_ZONE);

  const date = `${month} ${day}${nth(day)}, ${year}`;
  const hours12 = hours % 12 || 12;
  const hourHand = (hours % 12) * 30 + minutes / 2;
  const minuteHand = minutes * 6;
  const secondHand = seconds * 6;

  return (
    <div className="mt-1 flex flex-row items-center">
      <div className="animate relative mr-1 size-5 rounded-[100px] border border-black bg-white dark:border-0">
        <div
          className="hour"
          suppressHydrationWarning
          style={{
            transform: `rotate(${hourHand}deg)`,
            transition: hourHand === 0 ? "all 0.0s" : "transform .95s",
          }}
        ></div>
        <div
          className="minute"
          suppressHydrationWarning
          style={{
            transform: `rotate(${minuteHand}deg)`,
            transition: minuteHand === 0 ? "all 0.0s" : "transform .95s",
          }}
        ></div>
        <div
          className="second"
          suppressHydrationWarning
          style={{
            transform: `rotate(${secondHand}deg)`,
            transition: secondHand === 0 ? "all 0.0s" : "transform .95s",
          }}
        ></div>
      </div>
      <div suppressHydrationWarning>
        {date} •{" "}
        <span className="inline-block max-w-[56px] min-w-[56px]">
          {`${hours12.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
        </span>
        &nbsp;
        {hours >= 12 ? "PM " : "AM "}
        {timeZoneName}
      </div>
    </div>
  );
}
