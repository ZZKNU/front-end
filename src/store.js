// src/store/authStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { decodeToken } from "./util/decodeToken";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      accessToken: "",
      refreshToken: "",
      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),
      clearAuth: () => set({ accessToken: "", refreshToken: "" }),
      getUserInfo: () => {
        const { accessToken } = get();
        if (!accessToken) return null;
        return decodeToken(accessToken);
      },
    }),
    { name: "auth-storage", getStorage: () => sessionStorage }
  )
);
