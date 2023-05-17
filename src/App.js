import "./App.css";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import Home from "./components/Home";
import Portfolio from "./components/Portfolio";
import Root from "./components/Root";
import Error from "./components/Error"
import FourOhFour from "./components/FourOhFour";
import Homelab from "./components/Homelab";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/portfolio",
        element: <Portfolio />,
      },
      {
        path: "/homelab",
        element: <Homelab />
      },
      {
        path: "/404",
        element: <FourOhFour />
      },
      {
        path: "/*",
        element: <Navigate to="/404" replace />
      }
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
