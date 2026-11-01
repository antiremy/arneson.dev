import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 text-center">
      <div className="flex items-center justify-center">
        <h1 className="mr-5 border-r border-current pr-6 text-2xl leading-[49px] font-medium">
          404
        </h1>
        <h2 className="text-sm leading-[49px]">This page could not be found.</h2>
      </div>
      <Link
        to="/"
        className="text-sm font-medium hover:underline"
        data-umami-event="Back to home"
      >
        Back to home
      </Link>
    </div>
  );
}
