
interface Env {
  NODE_ENV: 'development' | 'production';
  BASE_URL: string;
  VUE_APP_APPNAME: string;
  VUE_APP_API_URL: string;
}

// 同时支持precess.env和import.meta.env两种写法

namespace NodeJS {
  interface Process {
    readonly env: Env;
  }
}

interface ImportMeta {
  readonly env: Env;
}