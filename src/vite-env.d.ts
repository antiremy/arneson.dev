/// <reference types="vite/client" />

declare module "*?format=webp&as=metadata" {
  const image: import("./ui/images/image").ImageMetadata;
  export default image;
}
