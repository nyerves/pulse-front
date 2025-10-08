import axios from "axios";
import type { AuthResponse } from "@common/models";
import { StorageKeys } from "@common/utils/StorageKeys";

const path = import.meta.env.VITE_FULL_API;

export const AuthService = {
  async Login(username: string, password: string) {
    try {
      const res = await axios.post<AuthResponse>(path + "/Auth/login", {
        username,
        password,
      });

      localStorage.setItem(StorageKeys.USER_AUTH, JSON.stringify(res.data));
    } catch (error) {
      throw error;
    }
  },
  GetUserAuth() {
    const user = localStorage.getItem(StorageKeys.USER_AUTH);
    return user ? (JSON.parse(user) as AuthResponse) : null;
  },
};
