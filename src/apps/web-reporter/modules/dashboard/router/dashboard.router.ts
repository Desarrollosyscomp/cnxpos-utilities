export const DashboardRouter = [
    // path: "/web-report-v2/",
    // component: () => {
    //   if (import.meta.env.VITE_TARGET === "mobile") {
    //     // @ts-ignore
    //     return import("../responsive-switcher/MobileDashboardSwitcher.vue");
    //   } else {
    //     // @ts-ignore
    //     return import("../responsive-switcher/DashboardSwitcher.vue");
    //   }
    // },

    {
      path: "dashboard",
      name: "dashboard",
      // @ts-ignore
      component: () => import("../pages/DashboardPage.vue"),
      meta: {
        requiresAuth: true
      }     
    },
];
