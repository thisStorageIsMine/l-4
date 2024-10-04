
export interface IUseUserState {
    isAuth: boolean;
}

export interface IUseUserActions {
    setAuth: (auth: boolean) => void
}