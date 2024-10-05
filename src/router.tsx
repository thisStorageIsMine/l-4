import { createBrowserRouter } from "react-router-dom";
import { Login, SignUp } from "./components/pages";

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login></Login>,
    },
    {
        path: '/signup',
        element: <SignUp />
    }
])

export { router }