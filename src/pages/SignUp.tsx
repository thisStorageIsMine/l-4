import { Link } from "react-router-dom"
import { Input } from "../components/ui"
import { useTitle } from "../hooks/indes"

const SignUp = () => {
    useTitle('Создать аккаунт')


    return (
        <>
            <div className="flex flex-col w-full max-w-[425px] min-h-[500px] items-center p-10 gap-4">
                <h1>Регистрация</h1>
                <Input type="text" placeholder="Логин" className="mt-6 w-full"></Input>
                <Input type="password" placeholder="Пароль" className="w-full"></Input>
                <Input type="password" placeholder="Подтвердите пароль" className="w-full"></Input>

                <button className="mt-6 w-2/3">Создать</button>

                <p className=" mt-2">
                    Уже есть аккаунт? <Link to="/login">Войдите</Link>
                </p>

            </div>
        </>
    )
}


export { SignUp }