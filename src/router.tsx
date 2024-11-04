import { createBrowserRouter } from "react-router-dom";
import { Comments, Login, SignUp } from "./components/pages";
import { Protected, StocksAdmin } from "./components";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/comments",
    element: (
      <Protected>
        <Comments />
      </Protected>
    ),
  },
  {
    path: "/stock-admin",
    element: (
      <Protected>
        <StocksAdmin />
      </Protected>
    ),
  },
]);

export { router };
