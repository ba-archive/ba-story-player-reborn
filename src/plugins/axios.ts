import AxiosStatic, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import router from "@/router";
import { is } from "@/util/typeUtil";
import { R } from "@/api";

function throwError(message: string, res: AxiosResponse<any>): never {
  const error: any = new Error(message);
  for (const key of Object.keys(res)) {
    error[key] = (res as any)[key];
  }
  throw error;
}

NProgress.configure({
  showSpinner: false,
});

const axios: AxiosInstance = AxiosStatic.create({});

axios.defaults.timeout = 60 * 1000;
axios.defaults.validateStatus = function(status) {
  return status >= 200 && status < 600; // 默认的
};
axios.interceptors.request.use(
  async(cfg) => {
    // Do something before request is sent
    NProgress.start();
    const meta = cfg.meta || {};
    return cfg;
  },
  (err) => {
    // Do something with request error
    throw err;
  },
);

// Add a response interceptor
axios.interceptors.response.use(
  async(res) => {
    // Do something with response data
    NProgress.done();

    if (res.status == 401) {
      router.push("/login");
    } else if (res.data && is<R>(res.data, res.data.code && res.data.msg)) {
      if (res.data.code < 400) {
        return res;
      }
      // Message.error(res.data.msg);
      throwError(res.data.message, res);
    } else if (res.status > 400) {
      // 系统接口以外的错误
      let msg = `未知错误 ${res.status} ${res.statusText}`;
      // Message.error(msg);

      if (typeof res.data === "string") {
        msg += "\n" + res.data.slice(0, 200);
        if (res.data.length > 200) {
          msg += "...";
        }
      }
      throwError(msg, res);
    }
    return res;
  },
  (err) => {
    console.error(err);
    const msg = err instanceof Error ? err.message : String(err);
    // Message.error("网络异常：" + msg);
    // Do something with response error
    NProgress.done();

    throw err;
  },
);



declare module "axios" {
  interface AxiosRequestConfig {
    meta?: Record<string, any>;
  }
}

export default axios;
