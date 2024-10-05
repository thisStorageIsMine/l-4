import { Link } from "react-router-dom"
import { Input } from "../ui"
import { useDebounce, useTitle } from "../../hooks/indes"
import { ChangeEvent, ChangeEventHandler, Dispatch, FormEventHandler, SetStateAction, useCallback, useRef, useState } from "react"
import { SupabaseService } from "../../supabase"
import { useQuery } from "react-query"

const SignUp = () => {
    useTitle('Создать аккаунт')

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('')
    const [confurmPassword, setConfurmPassword] = useState('')

    const { data, isFetching: isLoginFetching, refetch: getIsLoginExists, } = useQuery({
        queryKey: ['getUser', login],
        queryFn: async () => {
            console.log('Check')
            const [data, error] = await SupabaseService.getRow('users', ['login'], ['login', login])
            if (error || data === null) {
                console.error(`CAN\'T CREATE USER: `)
                throw new Error('LOGIN EXISTS')
            }


            return data.length > 0
        },
        enabled: false
    })

    const getDebouncedLogin = useDebounce(getIsLoginExists)

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        if (login.length === 0 || password.length === 0 || confurmPassword.length === 0) {
            console.error('NO PASSWORD OR LOGIN: password & login must be not null')
            return;
        }

        if (confurmPassword !== password) {
            console.error('CAN\'T CONFURM PASSWORD: Chech password and confurm password fields')
            return;
        }

        const { data } = await getIsLoginExists()

        if (data) {
            console.error(`CAN\'T CREATE USER: this login already exists`)
            return
        }

        const [rows, error] = await SupabaseService.insertRows('users', [{ login, password }])

        if (error) {
            console.error(`CAN\'T CREATE USER: ${error}`)
            return
        }

        console.log('Пользователь создан')
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>, dispatch: Dispatch<SetStateAction<string>>) => {
        dispatch(e.target.value.trim())
    }

    const hangleLoginChange = (e: ChangeEvent<HTMLInputElement>, dispatch: Dispatch<SetStateAction<string>>) => {
        dispatch(e.target.value.trim())
        getDebouncedLogin(1000)
    }

    return (
        <>
            <form className="flex flex-col w-full max-w-[425px] min-h-[500px] items-center p-10 gap-4" onSubmit={handleSubmit}>
                <h1>Регистрация</h1>
                <div className="relative">
                    <Input type="text" placeholder="Логин" className="mt-6 w-full" onChange={e => hangleLoginChange(e, setLogin)} required></Input>
                    <div>
                        {isLoginFetching
                            ?
                            <span>Проверяем свободен ли логин...</span>
                            :
                            <span>
                                {data ? <p>Логин занят!</p> : <p>Логин свободен</p>}
                            </span>
                        }

                    </div>
                </div>
                <Input type="password" placeholder="Пароль" className="w-full" onChange={e => handleChange(e, setPassword)} required></Input>
                <Input type="password" placeholder="Подтвердите пароль" className="w-full" onChange={e => handleChange(e, setConfurmPassword)} required></Input>

                <button
                    className={`mt-6 w-2/3 ${isLoginFetching ? "animate-pulse brightness-50 cursor-progress" : ""}`}
                    disabled={isLoginFetching}
                >
                    Создать
                </button>

                <p className=" mt-2">
                    Уже есть аккаунт? <Link to="/login">Войдите</Link>
                </p>

            </form>
        </>
    )
}


export { SignUp }