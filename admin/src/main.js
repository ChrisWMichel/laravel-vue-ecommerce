import { createApp } from "vue";
import "./index.css";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";

const store = createPinia();

createApp(App).use(store).use(router).mount("#app");
