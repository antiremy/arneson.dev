## arneson.dev

This is the personal website of Remington Arneson hosted at https://arneson.dev. Built using React, Vite, and Tailwind CSS.

Every page is prerendered to static HTML at build time. A small dependency-free Node server (`server/`) serves those files plus `/api/weather`, which keeps the OpenWeather key server-side.

- `pnpm dev` — Vite dev server, including `/api/weather` (reads `OPEN_WEATHER_API_KEY` from `.env.local`)
- `pnpm build` — writes `dist/client` and `dist/server`
- `pnpm start` — runs the production server against the build

To upgrade Node.js, change `.node-version`; CI and the Docker image both read it.
