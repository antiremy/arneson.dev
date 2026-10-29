import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { routes } from "./routes";

import "./global.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

const router = createBrowserRouter(routes, {
  hydrationData: window.__staticRouterHydrationData,
});

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
