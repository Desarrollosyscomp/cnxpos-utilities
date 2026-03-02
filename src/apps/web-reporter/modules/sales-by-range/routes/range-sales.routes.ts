export const RangeSalesRoutesDesktop = [
  {
    path: "/web-report-v2",
    // @ts-ignore
    component: () => import("../../../layouts/WebReporterLayout.vue"),
    children: [
      {
        path: "range-sales",
        name: "range-sales",
        // @ts-ignore
        component: () => import("../../sales-by-range/components/desktop/DesktopRangeSalesMain.vue"),
      },
      
    ]
  }
];
