import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../components/HelloWorld.vue";
import { AuthRouter } from "../modules/auth/router/auth.router";
import { HomeRouter } from "../modules/home/router/home.router";
import { RangeSalesRouterDesktop } from "../apps/web-reporter/modules/sales-by-range/router/range-sales.router";
import { WebReporterRouter } from "../apps/web-reporter/router/web-reporter.router";
import { useAuthStore } from "../modules/auth/store/auth.store";

const routes = [
  {
    path: "/",
    name: "home",
    meta: {
      type: "everyone",
    },
    component: HomeView,
  },
  ...AuthRouter,
  ...HomeRouter,
  ...WebReporterRouter,
  ...RangeSalesRouterDesktop,
  //   {
  //     path: "/unauthorized",
  //     name: "unauthorized",
  //     meta: {
  //       type: "private",
  //       blockInitialEndpoints: true
  //     },
  //     component: Unauthorized,
  //   },
  //   {
  //     path: "/invalid-system-client",
  //     name: "invalid-system-client",
  //     meta: {
  //       blockInitialEndpoints: true
  //     },
  //     component: InvalidSystemClient,
  //   },
  //   {
  //     path: "/expired/license",
  //     name: "expired-license",
  //     meta: {
  //       type: "everyone",
  //       blockInitialEndpoints: true
  //     },
  //     component: ExpiredLicense,
  //   },
  //  { path: "/:pathMatch(.*)*", name: "not-found", meta: { type: "only-guest" }, component: NotFound },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});


router.beforeEach((to, from, next) => {
  from;
  to;
  const authStore = useAuthStore();

  if (to.path == "/") {
    next("/auth/login");
    return;
  }
  if (to.path === "/" && !authStore.auth.token) {
    next("/auth/login");
    return;
  }

  if (!authStore.auth.token && to.meta.requiresAuth) {
    next("/auth/login");
    return;
  }
  next();
});
export default router;
