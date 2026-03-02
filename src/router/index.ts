import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../components/HelloWorld.vue";
import { AuthRouter } from "../modules/auth/router/auth.router";
import { HomeRouter } from "../modules/home/router/home.router";
import { RangeSalesRouterDesktop } from "../apps/web-reporter/modules/sales-by-range/router/range-sales.router";
import { WebReporterRouter } from "../apps/web-reporter/router/web-reporter.router";

const routes = [
  {
    path: "/",
    name: "home",
    meta: {},
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

  // const loadInitialEnpoints = () => {
  // const authStore = useAuthStore();
  // authStore.loadPermissions();
  // const appStore = useAppStore();
  // appStore.loadSettings();
  // }

  router.beforeEach((to, from, next) => {
    from;
    // const authStore = useAuthStore();
    // const toPathSegments = to.path.split("/");
    // let { redirect } = verifyRouteAccess(authStore, toPathSegments);

    //DESCOMENTAR CUANDO SE HAGA LA AUTENTICACION
    // if (to.path === "/") {
    //   next('/auth/login')
    //   return
    // }
    if (to.path === "/") {
      next('/home/welcome')
      return
    }
    next();
  });
export default router;
