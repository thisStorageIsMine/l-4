
export interface IUseUserState {
    isAuth: boolean;
    name: TName<IUseUserState['isAuth']>
}

export type TName<T extends boolean> = T extends true ? string : null

export interface IUseUserActions {
    setAuth: (auth: boolean) => void
    setName: (name: string) => void
}