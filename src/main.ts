import { createApp } from "vue";
import "./styles/style.css";
import "./styles/flexbox.css";
import { createPinia } from "pinia";

// import router from "./router";
import App from "./App.vue";
import "./components/beauty-alert/styles/vue.css";
import "./components/beauty-alert/styles/vanilla.css";
const app = createApp(App);
console.log("mode: " + import.meta.env.VITE_TARGET);

if (import.meta.env.VITE_TARGET === 'mobile') {
  const { default: router } = await import('./router/index.mobile')
  app.use(router)
} else {
  const { default: router } = await import('./router/index')
  app.use(router)
}

app.use(createPinia());
app.mount("#app");
