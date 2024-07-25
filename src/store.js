// Login상태관리를 위한 Store //
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: "",
      refreshToken: "",
      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),
      clearTokens: () => set({ accessToken: "", refreshToken: "" }),
    }),
    { name: "auth-storage", getStorage: () => sessionStorage }
  )
);
