import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../components/HelloWorld.vue";
import { DailySalesRoutes } from "../apps/web-reporter/modules/daily-sales/routes/daily-sales.router";
import { AuthRoutes } from "../modules/auth/router/auth.routes.mobile";
import { HomeRoutes } from "../modules/home/router/home.routes";

const routes = [
  {
    path: "/",
    name: "home",
    meta: {},
    component: HomeView,
  },
  ...DailySalesRoutes,
  ...AuthRoutes,
  ...HomeRoutes
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

//   const loadInitialEnpoints = () => {
//   const authStore = useAuthStore();
//   authStore.loadPermissions();
//   const appStore = useAppStore();
//   appStore.loadSettings();
//   }

router.beforeEach((to, from, next) => {
  from;
  to;

//   const localRoute = isLocalRoute(to.path)
//   const authStore = useAuthStore();
//   if (!localRoute.exist) {
//     //En este scope se asume que la ruta requiere que el usuario esté logueado
//     if (!authStore.user.token) {
//       next('/login')
//       return
//     }
    
//     const hasPermissions = verifyRouteInPermissions(to.path, authStore);
//     if (!hasPermissions) {
//       next('/unauthorized')
//       return
//     }
//   }
//   if(to.meta.type == "only-guest" && authStore.user.token){
//     next('/')
//     return
//   }
//   if(to.meta.type == "private" && !authStore.user.token){
//     next('/login')
//     return
//   }
//   if(!to.meta.blockInitialEndpoints){
//     loadInitialEnpoints()
//   }
  next();
});

export default router;
