import type { RouteObject } from "react-router";
import { siteDescription, type PageMeta } from "./metadata";
import Home from "./pages/home";
import NotFound from "./pages/notFound";
import ProjectLayout from "./pages/projects/layout";
import Monitr from "./pages/projects/monitr";
import { projectMeta } from "./pages/projects/projects";
import Wrath from "./pages/projects/wrath";
import Root from "./pages/root";

const homeMeta: PageMeta = { description: siteDescription, path: "/" };

export const notFoundMeta: PageMeta = {
  title: "404: This page could not be found.",
  description: siteDescription,
  path: "/404",
  noindex: true,
};

export const routes: RouteObject[] = [
  {
    Component: Root,
    children: [
      { index: true, Component: Home, handle: homeMeta },
      {
        Component: ProjectLayout,
        children: [
          { path: "monitr", Component: Monitr, handle: projectMeta("monitr") },
          { path: "wrath", Component: Wrath, handle: projectMeta("wrath") },
        ],
      },
      { path: "*", Component: NotFound, handle: notFoundMeta },
    ],
  },
];
