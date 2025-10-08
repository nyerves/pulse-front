import axios from "axios";

export const AuthService = {
  async Login(username: string, password: string) {
    const path = import.meta.env.VITE_FULL_API;
    const url = path + "/Auth/login";

    const res = await axios.post(url, {
      username,
      password,
    });

    console.log(res);
  },
};
