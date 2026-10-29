import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv, type Plugin } from "vite";
import { imagetools } from "vite-imagetools";
import {
  getRequestLocation,
  getSimplifiedWeatherData,
} from "./server/weather.ts";

const UMAMI_WEBSITE_ID = "371ca0ca-bed0-4b09-a25d-f14cbaed47c5";

// Serves /api/weather from the dev server with the same handler the production
// server uses, so `pnpm dev` needs no second process.
function weatherApi(): Plugin {
  return {
    name: "weather-api",
    apply: "serve",
    configureServer(server) {
      // Only this key is loaded, and only into the dev server's process; it is
      // never exposed to client code.
      process.env.OPEN_WEATHER_API_KEY ??= loadEnv(
        server.config.mode,
        process.cwd(),
        "OPEN_WEATHER_API_KEY",
      ).OPEN_WEATHER_API_KEY;

      server.middlewares.use("/api/weather", (req, res, next) => {
        getSimplifiedWeatherData(getRequestLocation(req.headers)).then(
          (weather) => {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(weather));
          },
          next,
        );
      });
    },
  };
}

// Production builds only, matching the old NODE_ENV gate, so local visits
// aren't recorded.
function analytics(): Plugin {
  return {
    name: "analytics",
    apply: "build",
    transformIndexHtml: () =>
      ["script.js", "recorder.js"].map((file) => ({
        tag: "script",
        attrs: {
          src: `https://analytics.remy.lol/${file}`,
          defer: true,
          "data-website-id": UMAMI_WEBSITE_ID,
        },
        injectTo: "body",
      })),
  };
}

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [tailwindcss(), react(), imagetools(), weatherApi(), analytics()],
  resolve: {
    // weather-react-icons pins React 17 as a regular dependency; without this
    // its icons are built against a second copy of React and fail to render.
    dedupe: ["react", "react-dom"],
  },
  build: {
    // The server bundle overrides this with --outDir dist/server.
    outDir: isSsrBuild ? "dist/ssr" : "dist/client",
    copyPublicDir: !isSsrBuild,
  },
  // Bundle every dependency into the SSR outputs, so the prerender step and
  // the runtime server never resolve packages from node_modules.
  ssr: { noExternal: true },
}));
