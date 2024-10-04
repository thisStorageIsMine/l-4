import { create } from "zustand";
import { IUseUserActions, IUseUserState } from "./useUser.types";


const useUser = create<IUseUserActions & IUseUserState>(set => ({
    isAuth: false,
    setAuth: (auth) => set((state) => ({ isAuth: auth }))
}))

export {useUser}