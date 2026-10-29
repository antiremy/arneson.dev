import { Outlet } from "react-router";
import { Header } from "./header";

export default function ProjectLayout() {
  return (
    <div className="h-screen w-full pt-12">
      <Header />
      <div className="scrollbar z-0 flex h-full w-full justify-center overflow-x-hidden overflow-y-auto">
        <main className="max-w-2xl px-4 text-sm">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
