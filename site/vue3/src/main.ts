import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import "@/assets/styles/index.less";
import { createPinia } from "pinia"
import { Message } from '@arco-design/web-vue';

const pinia = createPinia()

const app = createApp(App);
app.use(router).use(pinia).mount("#app");
Message._context = app._context;
