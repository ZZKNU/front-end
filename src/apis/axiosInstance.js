import axios from "axios";
import { useAuthStore } from "../store";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// function : RefreshToken관리
// eslint-disable-next-line no-unused-vars
const refreshAccessToken = async (refreshToken) => {
  //   const response = await axios.post(`${BASE_URL}/auth/refresh`, {
  //     refreshToken,
  //   });
  //   return response.data.accessToken;
  //   return "newAccessToken";
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { refreshToken } = useAuthStore.getState();
        const newAccessToken = await refreshAccessToken(refreshToken);
        useAuthStore.getState().setTokens(newAccessToken, refreshToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰이 만료되었거나 유효하지 않은 경우 로그아웃 처리
        useAuthStore.getState().clearToken();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
