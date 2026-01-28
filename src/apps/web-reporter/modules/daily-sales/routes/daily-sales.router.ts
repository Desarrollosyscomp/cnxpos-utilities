export const DailySalesRouter = [
    {
      path: "/web-report-v2/daily-sales",
      name: "web-report-v2-daily-sales",
      isAuth: false,
      //@ts-ignore
      component: () => import("../components/DailySalesMain.vue"),
      meta: { requiresAuth: true },
    },
  ];
  