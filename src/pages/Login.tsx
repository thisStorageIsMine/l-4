import { Link } from "react-router-dom"
import { Input } from "../components/ui"
import { useTitle } from "../hooks/indes"

import { useRef } from "react"

const Login = () => {
    useTitle('Войти в заметочную')

    const loginRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null)

    function handleClick() {
        if (!loginRef.current || !passwordRef.current) {
            console.error('NO INPUT: no input was provided')
            return;
        }

        const login = loginRef.current.value.trim()
        const password = passwordRef.current.value.trim()

        if (login.length === 0 || password.length === 0) {
            console.error('NO PASSWORD OR LOGIN: password & login must be not null')
            return;
        }

        // const {data, error}
        console.log('Всё хорошо')
    }

    return (
        <>
            <div className="flex flex-col w-full max-w-[350px] min-h-[500px] items-center p-10 gap-4">
                <h1>Вход</h1>
                <Input type="text" placeholder="Логин" className="mt-6 w-full" ref={loginRef} required />
                <Input type="password" placeholder="Пароль" className="w-full" ref={passwordRef} required />

                <button className="mt-6 w-full" onClick={() => handleClick()}>Войти</button>

                <p className=" mt-2">
                    У вас нету аккаунта? <Link to="/signup">Создайте его!</Link>
                </p>
            </div>
        </>
    )
}


export { Login }