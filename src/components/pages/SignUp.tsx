import { Link } from "react-router-dom"
import { FetchButton, Input } from "../ui"
import { useDebounce, useTitle } from "../../hooks/indes"
import { ChangeEvent,  Dispatch, FormEventHandler, SetStateAction,  useState } from "react"
import { SupabaseService } from "../../supabase"
import { useQuery } from "react-query"
import { useErrorNotification, useSuccessNotification } from "../ui/Notifications/hooks"

const SignUp = () => {
    useTitle('Создать аккаунт')

    const createSuccessNotification = useSuccessNotification()
    const createErrorNotification = useErrorNotification()

    const [showHelper, setShowHelper] = useState(false);

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('')
    const [confurmPassword, setConfurmPassword] = useState('')

    

    const { data, isFetching: isLoginFetching, refetch: getIsLoginExists, } = useQuery({
        queryKey: ['getUser', login],
        queryFn: async () => {
            const [data, error] = await SupabaseService.getRow('users', ['login'], ['login', login])
            if (error || data === null) {
                console.error(`CAN\'T CREATE USER: `)
                throw new Error('LOGIN EXISTS')
            }

            setShowHelper(true)
            setTimeout(() => setShowHelper(false), 3500)

            return data.length > 0
        },
        enabled: false
    })

    const [isLoginAvalable, setIsLoginAvalable] = useState(false)
    const isPasswordExists = password.trim() !== ''
    const isPassEqConfurm = confurmPassword === password
    const isButtonAvalable = isLoginAvalable && isPasswordExists && isPassEqConfurm && !isLoginFetching

    const getDebouncedLogin = useDebounce(async () => {
            const {data: isLoginExist} = await getIsLoginExists()
            setIsLoginAvalable(!isLoginExist)
        }
    )

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

        const [rows, error] = await SupabaseService.insertRows('users', [{ login, password }])

        if (error) {
            console.error(`CAN\'T CREATE USER: ${error}`);
            createErrorNotification('Не удалось создать пользователя', 'Поробуйте ещё раз. Или обновите страницу')
            return
        }

        createSuccessNotification(
            'Пользователь создан',
            'Можете войти в аккаунт',
        )
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>, dispatch: Dispatch<SetStateAction<string>>) => {
        dispatch(e.target.value.trim())
    }

    const hangleLoginChange = (e: ChangeEvent<HTMLInputElement>, dispatch: Dispatch<SetStateAction<string>>) => {
        dispatch(e.target.value.trim())
        getDebouncedLogin(1000)
    }

    const helper = isLoginFetching
    ?
    <span>Проверяем свободен ли логин...</span>
    : showHelper ?
    <span>
        { data ? <p className="text-red-400">Логин занят!</p> : <p className="text-emerald-400">Логин свободен</p>}
    </span>  
    : <></>


    return (
        <>
            <form className="flex flex-col w-full max-w-[425px] min-h-[500px] items-center p-10 gap-4" onSubmit={handleSubmit}>
                <h1>Регистрация</h1>
                <div className="relative flex flex-col mt-6 w-full">
                    <Input type="text" placeholder="Логин" className={``} onChange={e => hangleLoginChange(e, setLogin)} required></Input>
                    <div className="text-sm self-end mt-1">
                        {helper}
                    </div>
                </div>
                <Input type="password" placeholder="Пароль" className="w-full" onChange={e => handleChange(e, setPassword)} required></Input>
                <Input type="password" placeholder="Подтвердите пароль" className="w-full" onChange={e => handleChange(e, setConfurmPassword)} required></Input>

                {/* <button
                    className={`mt-6 w-2/3 ${isLoginFetching ? "animate-pulse brightness-50 cursor-progress" : ""}`}
                    disabled={!isButtonAvalable}
                >
                    Создать
                </button> */}
                <FetchButton type="submit" disabled={!isButtonAvalable} isFetching={isLoginFetching}>
                    Зарегистрироваться
                </FetchButton>

                <p className=" mt-2">
                    Уже есть аккаунт? <Link to="/login">Войдите</Link>
                </p>

            </form>
        </>
    )
}


export { SignUp }