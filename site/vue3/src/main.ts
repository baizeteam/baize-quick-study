import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import "@/assets/styles/index.less";
import { createPinia } from "pinia";
import { Message, Notification } from "@arco-design/web-vue";
import "@arco-design/web-vue/es/message/style/css.js";
import "@arco-design/web-vue/es/notification/style/css.js";

const pinia = createPinia();

const app = createApp(App);
Message._context = app._context;
Notification._context = app._context;
app.use(router).use(pinia).mount("#app");
