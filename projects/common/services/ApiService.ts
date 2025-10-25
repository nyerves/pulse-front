import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { StorageKeys } from "@common/utils/StorageKeys";
import { AuthService } from "@common/services/AuthService";
import { Debounce, WithParams } from "@common/helpers";
import type { ApiResponse } from "@common/models";

interface Props {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url?: string;
  module: string;
  data?: Record<string, any>;
  params?: any;
  _with?: string[];
  isExcel?: boolean;
}

export const ApiService = {
  async makeRequest<T>({
    method,
    url = "",
    module,
    data = {},
    params,
    isExcel,
  }: Props) {
    // if (!this.validLastRequest()) throw "expired token";

    const token = AuthService.GetToken();
    const baseURL = import.meta.env.VITE_FULL_API;
    const includes = WithParams(params?.with);

    const config: AxiosRequestConfig = {
      timeout: 120_000,
      method,
      data,
      params,
      baseURL,
      url: `/${module}${url}` + includes,
      responseType: isExcel ? "arraybuffer" : "json",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": isExcel
          ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          : "application/json",
      },
    };

    const instance = axios.create(config);
    this.interceptor(instance);

    try {
      const res = await instance<ApiResponse<T>>(config);
      return (isExcel ? res?.data : res.data?.data) as T;
    } catch (error) {
      throw error;
    }
  },
  interceptor(instance: AxiosInstance) {
    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && error.response.status === 401) {
          try {
            const refreshedToken = await AuthService.RefreshToken();
            error.config.headers["Authorization"] = `Bearer ${refreshedToken}`;

            return axios(error.config);
          } catch (refreshError) {
            closeSession();
          }
        } else {
          throw error;
        }
      }
    );
  },
  validLastRequest() {
    const { LAST_REQUEST } = StorageKeys;
    const lastRequest = localStorage.getItem(LAST_REQUEST);
    const currentRequest = new Date().toISOString();

    if (!lastRequest) {
      localStorage.setItem(LAST_REQUEST, currentRequest);
      return true;
    }

    // const diffInHours = DateFormats.GetMomentDiff(lastRequest, currentRequest, "hours")

    // if (diffInHours > 2) {
    //   const toast = useToast()

    //   // toast.error('La')
    //   AuthService.Logout()
    //   return false
    // }

    localStorage.setItem(LAST_REQUEST, currentRequest);
    return true;
  },
};

const closeSession = Debounce(() => AuthService.Logout());
