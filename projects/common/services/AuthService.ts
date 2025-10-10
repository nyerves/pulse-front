import axios from "axios";
import type { AuthResponse } from "@common/models";
import { StorageKeys } from "@common/utils/StorageKeys";

const path = import.meta.env.VITE_FULL_API;

export const AuthService = {
  GetUserAuth() {
    const user = localStorage.getItem(StorageKeys.USER_AUTH);
    return user ? (JSON.parse(user) as AuthResponse) : null;
  },
  GetToken() {
    const user = this.GetUserAuth();
    return user?.accessToken ?? "";
  },
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
  Logout(redirectToLogin = true) {
    Object.values(StorageKeys).forEach((key) => {
      localStorage.removeItem(key);
    });

    if (redirectToLogin) {
      window.dispatchEvent(new CustomEvent("logout"));
    }
  },
  async RefreshToken() {
    const userAuth = this.GetUserAuth();
    const url = path + "/Auth/Refresh";

    try {
      const { data } = await axios.post<any>(url, {
        expiredToken: userAuth?.accessToken,
        refreshToken: userAuth?.refreshToken,
      });

      const newUser = {
        ...userAuth,
        accessTokenExpiresAt: data.accessTokenExpiresAt,
        refreshToken: data.refreshToken,
      };

      localStorage.setItem(StorageKeys.USER_AUTH, JSON.stringify(newUser));

      return data.accessToken;
    } catch (error) {
      throw error;
    }
  },
};
