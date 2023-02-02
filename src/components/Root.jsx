import { Outlet } from "react-router-dom";

import Nav from "./Nav";

export default function Root() {
  return <div className="w-full h-full flex lg:flex-row max-lg:flex-col max-lg:items-center max-lg:px-5">
    <Nav />
    <Outlet />
  </div>;
}
