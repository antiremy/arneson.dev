/// <reference types="vite/client" />

declare module "*?format=webp&as=metadata" {
  const image: import("./ui/images/image").ImageMetadata;
  export default image;
}

// Written into each prerendered page by <StaticRouterProvider>.
interface Window {
  __staticRouterHydrationData?: import("react-router").HydrationState;
}
