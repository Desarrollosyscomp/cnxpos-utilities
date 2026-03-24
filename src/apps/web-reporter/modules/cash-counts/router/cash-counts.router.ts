export const CashCountsRouterDesktop = [
  {
    path: "/web-report-v2",
    // @ts-ignore
    component: () => import("../../../layouts/WebReporterLayout.vue"),
    children: [
      {
        path: "registers",
        name: "registers",
        // @ts-ignore
        component: () => import("../../cash-counts/pages/CashCountsPage.vue"),
      },
      
    ]
  }
];
