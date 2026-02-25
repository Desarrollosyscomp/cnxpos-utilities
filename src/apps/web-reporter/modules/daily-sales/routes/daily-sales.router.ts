export const DailySalesRoutes = [
  {
    path: "/web-report-v2/",
    component: ()=>{
      if (import.meta.env.VITE_TARGET === "mobile") {
        // @ts-ignore
        return import("../responsive-switcher/MobileDailySalesSwitcher.vue");
      } else {
        // @ts-ignore
        return import("../responsive-switcher/DailySalesSwitcher.vue");
      }
    },

    children: [
      {
        path: "daily-sales",
        name: "daily-sales",
        // @ts-ignore
        component: () => import("../pages/DailySalesPage.vue"),
      },
      {
        path: "invoices",
        name: "invoices",
        // @ts-ignore
        component: () => import("../components/mobile/InvoicesMain.vue"),
      },
      {
        path: "invoice-details",
        name: "invoice-details",
        // @ts-ignore
        component: () => import("../components/mobile/InvoicesDetails.vue"),
      }
    ],
  },
];
