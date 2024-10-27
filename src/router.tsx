import { createBrowserRouter } from "react-router-dom";
import { Comments, Login, SignUp } from "./components/pages";
import { Protected } from "./components";

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
]);

export { router };
