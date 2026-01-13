import axios from "axios";
import { useAuth } from "../stores/authStore";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const httpRequest = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 7000,
});

let refreshPromise = null;

const getNewToken = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: JSON.parse(localStorage.getItem("token")).refresh_token,
        }),
      }
    );
    if (!response.ok) throw new Error("Unauthorize");
    return response.json();
  } catch (error) {
    return false;
  }
};

httpRequest.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    config.headers.Authorization = `Bearer ${token.access_token}`;
  }
  return config;
});

httpRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (+error.message?.status === 401) {
      if (!refreshPromise) {
        refreshPromise = getNewToken();
      }
      const newToken = await refreshPromise;
      if (newToken) {
        localStorage.setItem("token", JSON.stringify(newToken));
        return httpRequest(error.config);
      } else {
        useAuth.getState().logout();
      }
    }

    if (error.message === "Network Error") {
      return Promise.reject("Check your network connection!");
    } else {
      return Promise.reject(error?.response?.data?.message);
    }
  }
);

