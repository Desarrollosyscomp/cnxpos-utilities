export const CashCountsRouterMobile = [
  {
    path: "/web-report-v2",
    // @ts-ignore
    component: () => import("../../../layouts/WebReporterLayoutMobile.vue"),
    children: [
      {
        path: "registers",
        name: "registers",
        // @ts-ignore 
        component: () => import("../../sales-by-range/components/mobile/MobileRangeSalesMain.vue"),
      },
      
    ]
  }
];
