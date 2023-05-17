import { Helmet } from "react-helmet";

export default function FourOhFour() {
  return (
    <div className="w-full justify-center flex mt-20">
      <Helmet>
        <title>404 | Remington</title>
      </Helmet>
      <div className="lg:w-1/2 max-w-xl flex flex-col justify-top">
        <div className="text-3xl font-bold font-white">Page not found</div>
        <span className="text-lg pt-4 text-white opacity-50">
          The page you are looking for has moved or doesn't exist. Use the nav bar to explore the site.
        </span>
      </div>
    </div>
  );
}
