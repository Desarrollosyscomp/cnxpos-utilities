export const DailySalesRouter = [
  {
    path: "daily-sales",
    name: "daily-sales",
    // @ts-ignore
    component: () => import("../pages/DailySalesPage.vue"),
  },
  {
    path: "invoices/:date/:warehouse_id",
    name: "invoices",
    // @ts-ignore
    component: () => import("../components/mobile/InvoicesMain.vue"),
  },
  {
    path: "invoice-details/:warehouse_id/:invoice_id",
    name: "invoice-details",
    // @ts-ignore
    component: () => import("../components/mobile/InvoicesDetails.vue"),
  }
  // {
  //   path: "/web-report-v2/",
  //   component: ()=>{
  //     if (import.meta.env.VITE_TARGET === "mobile") {
  //       // @ts-ignore
  //       return import("../responsive-switcher/MobileDailySalesSwitcher.vue");
  //     } else {
  //       // @ts-ignore
  //       return import("../responsive-switcher/DailySalesSwitcher.vue");
  //     }
  //   },

    // children: [
      
    // ],
];
