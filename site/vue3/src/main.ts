import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import "@/assets/styles/index.less";
import { createPinia } from "pinia";
import { Message, Notification, Modal } from "@arco-design/web-vue";
import "@arco-design/web-vue/es/message/style/css.js";
import "@arco-design/web-vue/es/notification/style/css.js";
import "@arco-design/web-vue/es/modal/style/css.js";
import hljsVuePlugin from "@highlightjs/vue-plugin";

const pinia = createPinia();

const app = createApp(App);
Message._context = app._context;
Notification._context = app._context;
Modal._context = app._context;
app.use(router).use(pinia).use(hljsVuePlugin).mount("#app");