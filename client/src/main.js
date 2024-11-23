require("../node_modules/bootstrap/dist/css/bootstrap.css");
import "bootstrap/dist/css/bootstrap.css";

import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import App from "./App";

const app = createApp(App);

app.use(ElementPlus);

app.mount("#app");
