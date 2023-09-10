import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { registerGlobalComponents } from "./components";

import "@/styles/index.scss";
import "uno.css";

const app = createApp(App);
app
  .use(router)
  .use(createPinia())
  .use(registerGlobalComponents);

app.mount("#app");


