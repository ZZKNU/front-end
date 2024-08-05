// src/store/authStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: "",
      refreshToken: "",
      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),
      clearAuth: () => set({ accessToken: "", refreshToken: "" }),
    }),
    { name: "auth-storage", getStorage: () => sessionStorage }
  )
);
