import { config } from "@fortawesome/fontawesome-svg-core";
import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { routes } from "./routes";

import "./global.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

// The stylesheet is bundled above; stop Font Awesome from also injecting a
// <style> tag at runtime, which the Content-Security-Policy would block.
config.autoAddCss = false;

const router = createBrowserRouter(routes);

const app = (
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

// Built pages arrive prerendered (see scripts/prerender.mjs); the dev server
// serves the bare index.html, which only has a placeholder comment in #root.
const container = document.getElementById("root")!;
if (container.firstElementChild) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
