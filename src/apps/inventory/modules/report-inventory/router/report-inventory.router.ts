export const ReportInventoryRouterDesktop = [
  {
    path: "/inventory",
    // @ts-ignore
    component: () => import("../../../layouts/InventoryLayout.vue"),
    children: [
      {
        path: "report-inventory",
        name: "report-inventory",
        // @ts-ignore
        // component: () => import("../../sales-by-range/page/DesktopSalesByRangePage.vue"),
        component: () => import("../pages/DesktopReportInventoryPage.vue"),
      },
      
    ]
  }
];
