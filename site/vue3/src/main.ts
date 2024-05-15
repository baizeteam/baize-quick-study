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
import CodeDemo from "@/components/CodeDemo/index.vue";
import "./app.less";

const pinia = createPinia();

const app = createApp(App);
Message._context = app._context;
Notification._context = app._context;
Modal._context = app._context;
app.component("code-demo", CodeDemo); // vue 可以在全局CodeDemo注册，react中是没有的
app.use(router).use(pinia).use(hljsVuePlugin).mount("#vue-app");
