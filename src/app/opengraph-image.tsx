import { ImageResponse } from "next/og";
import { ogImage } from "./_metadata";

export const alt = ogImage.alt;
export const size = { width: ogImage.width, height: ogImage.height };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1e2939", // gray-800
        color: "#ffffff",
        padding: "80px",
      }}
    >
      <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: "-0.02em" }}>
        Remington Arneson
      </div>
      <div
        style={{
          fontSize: 40,
          marginTop: 24,
          textAlign: "center",
          color: "#d1d5dc", // gray-300
        }}
      >
        Software engineer specializing in web development
      </div>
      <div
        style={{
          fontSize: 40,
          textAlign: "center",
          color: "#d1d5dc",
        }}
      >
        and reverse engineering
      </div>
      <div style={{ fontSize: 36, marginTop: 48, color: "#009966" }}>
        arneson.dev
      </div>
    </div>,
    size,
  );
}
