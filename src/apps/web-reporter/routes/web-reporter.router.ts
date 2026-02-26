import { DashboardRoutes } from "../modules/dashboard/router/dashboard.routes";
import { DailySalesRoutes } from "../modules/daily-sales/routes/daily-sales.routes";

export const WebReporterRoutes = [
  {
    path: "/web-report-v2/",
    component: () => {
      if (import.meta.env.VITE_TARGET === "mobile") {
        // @ts-ignore
        return import("../layouts/WebReporterLayoutMobile.vue");
      } else {
        // @ts-ignore
        return import("../layouts/WebReporterLayout.vue");
      }
    },
    children: [
      ...DashboardRoutes,
      ...DailySalesRoutes
    ]
  },
];
