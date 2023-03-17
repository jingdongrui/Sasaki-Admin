import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

declare module "axios" {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>;
  }
}

// axios请求配置 https://www.axios-http.cn/docs/req_config
const defaultConfig: AxiosRequestConfig = {
  baseURL: "/",
  // baseURL: "https://mock.presstime.cn/mock/635796d83ea0490082823f95/jingad",
  timeout: 5000,
  headers: {
    // Accept: "application/json",
    // "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    // "Content-Type": "application/json; charset=utf-8",
  }
};
// 创建请求实例
const service: AxiosInstance = axios.create(defaultConfig);

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  response => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
  },
  error => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    ElMessage.error(error);
    return Promise.reject(error);
  }
);

export default service;
