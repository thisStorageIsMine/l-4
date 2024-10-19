import { create } from "zustand";
import { IUseUserActions, IUseUserState } from "./useUser.types";


const useUser = create<IUseUserActions & IUseUserState>(set => ({
    isAuth: false,
    user: null,
    setAuth: (auth) => set((state) => ({ isAuth: auth })),
    setUser: (name, id) => set((state) => ({ user: { name, id } }))
}))

export { useUser }