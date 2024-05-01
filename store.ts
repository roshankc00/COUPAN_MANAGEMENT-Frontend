import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../server/src/users/entities/user.entity";

export interface UserStore {
  user: User | undefined;
  isLoggedInStatus: boolean;
  setUser: (data: User) => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: undefined,
      isLoggedInStatus: false,
      setUser: (data: User) =>
        set(() => ({ user: data, isLoggedInStatus: true })),
    }),
    { name: "user-store" }
  )
);

export default useUserStore;
