import { DashboardRouter } from "../modules/dashboard/router/dashboard.router";
import { DailySalesRouter } from "../modules/daily-sales/router/daily-sales.router";

export const WebReporterRouter = [
  {
    path: "/web-report-v2/",
    component: () => {
      if (import.meta.env.VITE_TARGET === "mobile") {
        // @ts-ignore
        return import("../modules/daily-sales/responsive-switcher/MobileDailySalesSwitcher.vue");
      } else {
        // @ts-ignore
        return import("../modules/daily-sales/responsive-switcher/DailySalesSwitcher.vue");
      }
    },
    children: [
      ...DashboardRouter,
      ...DailySalesRouter
    ]
  },
];
