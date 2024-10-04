import { create } from "zustand";
import { IUseUserActions, IUseUserState } from "./useUser.types";


const useUser = create<IUseUserActions & IUseUserState>(set => ({
    isAuth: false,
    name: null,
    setAuth: (auth) => set((state) => ({ isAuth: auth })),
    setName: (name) => set((state) => ({name}))
}))

export {useUser}