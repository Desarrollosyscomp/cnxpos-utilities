export const RangeSalesRoutesMobile = [
  {
    path: "/web-report-v2",
    // @ts-ignore
    component: () => import("../../../layouts/WebReporterLayoutMobile.vue"),
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
