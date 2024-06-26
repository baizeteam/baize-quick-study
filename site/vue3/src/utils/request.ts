import axios from "axios";
import type { AxiosResponse, AxiosInstance, InternalAxiosRequestConfig } from "axios";

const request: AxiosInstance = axios.create({
  baseURL: "/apiVue/",
  timeout: 3000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8", // 传参方式json
  },
});

// 请求拦截
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截
request.interceptors.response.use(
  (response: AxiosResponse) => {
    const code = response.data.code;
    console.log(response, code, code === 200);
    if (code !== 200) {
      return Promise.reject(response);
    } else {
      return Promise.resolve(response.data);
    }
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default request;
