import { createBrowserRouter } from "react-router-dom";
import { Login, SignUp } from "./components/pages";
import { ErrorNotify, SuccessNotify } from "./components/ui/Notifications";

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login></Login>,
    },
    {
        path: '/signup',
        element: <SignUp />
    },
    {
        path: '/test',
        element: <SuccessNotify title="Не удалось создать аккаунт. Попробуйте перезагрузить страницу" text="方式" onClose={() => 1}></SuccessNotify>
    }
])

export { router }