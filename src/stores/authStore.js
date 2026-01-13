import { create } from "zustand";
import { httpRequest } from "../service/authApi";

export const useAuth = create((set) => {
  return {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: JSON.parse(localStorage.getItem("token")) || {},
    setToken: (token) => {
      set({ token });
    },
    setUser: async () => {
      try {
        const response = await httpRequest.get("/profile");
        const user = response.data;
        localStorage.setItem("user", JSON.stringify(user));
        set({ user });
        return user;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    logout: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      set({user: null});
      set({token: null});
    }
  };
});
