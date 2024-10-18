import { Link } from "react-router-dom"
import { FetchButton, Input } from "../ui"
import { useTitle } from "../../hooks/indes"

import { ChangeEvent, Dispatch, SetStateAction,  useState } from "react"
import { useErrorNotification, useSuccessNotification } from "../ui/Notifications/hooks"

const Login = () => {
    useTitle('Войти в заметочную')

    const showSuccessNotification = useSuccessNotification()
    const showErrorNotification = useErrorNotification()

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const isButtonAvalable = login.trim().length > 0 && password.trim().length > 0

    function handleClick() {

    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>, dispatch: Dispatch<SetStateAction<string>>) => {
        dispatch(e.target.value.trim())
    }

    return (
        <>
            <div className="flex flex-col w-full max-w-[350px] min-h-[500px] items-center p-10 gap-4">
                <h1>Вход</h1>
                <Input type="text" placeholder="Логин" className="mt-6 w-full" value={login} onChange={(e) => handleChange(e, setLogin)}  required />
                <Input type="password" placeholder="Пароль" className="w-full" value={password} onChange={(e) => handleChange(e, setPassword)} required />

                <button className="mt-6 w-full" disabled={!isButtonAvalable} onClick={() => handleClick()}>Войти</button>
                <FetchButton disabled={!isButtonAvalable} isFetching={false}>Войти</FetchButton>

                <p className=" mt-2">
                    У вас нету аккаунта? <Link to="/signup">Создайте его!</Link>
                </p>
            </div>
        </>
    )
}


export { Login }