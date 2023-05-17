import { useEffect } from "react";
import { redirect, useRouteError } from "react-router-dom";

export default function Error() {
  let error = useRouteError();

  useEffect(() => {
    console.log(error.status, error.status === 404);

    if (error.status === 404) {
      redirect("/404");
    }
  }, [error]);

  return <div>&nbsp;</div>;
}
