export const DailySalesRouterMobile = [
  {
    path: "/daily-sales",
    // @ts-ignore
    component: () => import("../../../layouts/WebReporterLayoutMobile.vue"),
    children: [
      {
        path: "daily-sales",
        name: "daily-sales",
        meta: {
          requiresAuth: true
        },
        // @ts-ignore
        component: () => import("../pages/MobileDailySalesPage.vue"),
      },
      
    ]
  }
];
