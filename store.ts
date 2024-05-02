import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IUser } from "./interfaces/user.interface";

export interface UserStore {
  user: IUser | undefined;
  isLoggedInStatus: boolean;
  setUser: (data: IUser) => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: undefined,
      isLoggedInStatus: false,
      setUser: (data: IUser) =>
        set(() => ({ user: data, isLoggedInStatus: true })),
    }),
    { name: "user-store" }
  )
);

export default useUserStore;
