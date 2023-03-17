import { createApp } from "vue";
import App from "@/App.vue";
import pinia from "@/store";
import router from "@/router/index";

// 样式
import "@/style/index.scss";
//全局组件
import SvgIcon from "@/components/SvgIcon/index.vue";

const app = createApp(App);

//全局组件
app.component("SvgIcon", SvgIcon);

app.use(pinia).use(router).mount("#app");
