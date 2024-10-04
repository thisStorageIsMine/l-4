import { Link } from "react-router-dom"
import { Input } from "../components/ui"
import { useTitle } from "../hooks/indes"
import { useRef } from "react"
import { SupabaseService } from "../supabase"

const SignUp = () => {
    useTitle('Создать аккаунт')

    const loginRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null)
    const confurmPasswordRef = useRef<HTMLInputElement>(null)

    const handleClick = async () => {
        if (!loginRef.current || !passwordRef.current || !confurmPasswordRef.current) {
            console.error('NO INPUT: no input was provided')
            return;
        }

        const login = loginRef.current.value.trim()
        const password = passwordRef.current.value.trim()
        const conf = confurmPasswordRef.current.value.trim()

        if (login.length === 0 || password.length === 0 || conf.length === 0) {
            console.error('NO PASSWORD OR LOGIN: password & login must be not null')
            return;
        }

        if (conf !== password) {
            console.error('CAN\'T CONFuRM PASSWORD: Chech password and confurm password fields')
            return;
        }

        const [data, error] = await SupabaseService.insertRows('users', [{ login, password }])

        if (error) {
            console.error(`CAN\'T CREATE USER: ${error}`)
            return
        }

        console.log('Пользователь создан')
    }

    return (
        <>
            <div className="flex flex-col w-full max-w-[425px] min-h-[500px] items-center p-10 gap-4">
                <h1>Регистрация</h1>
                <Input type="text" placeholder="Логин" className="mt-6 w-full" ref={loginRef}></Input>
                <Input type="password" placeholder="Пароль" className="w-full" ref={passwordRef}></Input>
                <Input type="password" placeholder="Подтвердите пароль" className="w-full" ref={confurmPasswordRef}></Input>

                <button className="mt-6 w-2/3" onClick={() => handleClick()}>Создать</button>

                <p className=" mt-2">
                    Уже есть аккаунт? <Link to="/login">Войдите</Link>
                </p>

            </div>
        </>
    )
}


export { SignUp }