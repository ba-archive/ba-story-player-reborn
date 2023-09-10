import { App } from "vue";
import ErrorPage from "./ErrorPage.vue";


const components = {
  ErrorPage,
};

/**
 * 注册全局组件
 * @param vue app
 */
export function registerGlobalComponents(vue: App) {
  for (const [name, component] of Object.entries(components)) {
    vue.component(name, component);
  }
}



declare module "vue" {
  interface GlobalComponents {
    ErrorPage: typeof ErrorPage,
  }
}
