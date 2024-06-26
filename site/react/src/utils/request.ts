import axios from "axios";
import { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const request: AxiosInstance = axios.create({
  baseURL: "/apiReact/",
  timeout: 2000,
  headers: {
    "Content-Type": "aapplication/json;charset=UTF-8",
  },
});

request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  (response: AxiosResponse) => {
    const code = response.data.code;
    if (code !== 200) {
      return Promise.reject(response);
    } else {
      return Promise.resolve(response.data);
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export default request;
