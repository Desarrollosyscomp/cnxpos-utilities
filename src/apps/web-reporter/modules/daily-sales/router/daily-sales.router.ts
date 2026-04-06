export const DailySalesRouter = [
  // {
  //   path: "daily-sales",
  //   name: "daily-sales",
  //   // @ts-ignore
  //   component: () => import("../pages/DailySalesPage.vue"),
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  // {
  //   path: "invoices/:date/:warehouse_id",
  //   name: "invoices",
  //   // @ts-ignore
  //   component: () => import("../components/mobile/InvoicesMain.vue"),
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  // {
  //   path: "invoice-details/:warehouse_id/:invoice_id",
  //   name: "invoice-details",
  //   // @ts-ignore
  //   component: () => import("../components/mobile/InvoicesDetails.vue"),
  //   meta: {
  //     requiresAuth: true
  //   }
  // }
  {
    path: "/web-report-v2",
    // @ts-ignore
    component: () => import("../../../layouts/WebReporterLayout.vue"),
    children: [
      {
        path: "daily-sales",
        name: "daily-sales",
        meta: {
          requiresAuth: true
        },
        // @ts-ignore
        component: () => import("../pages/DailySalesPage.vue"),
      },
      {
        path: "invoices/:date/:warehouse_id",
        name: "invoices",
        meta: {
          requiresAuth: true
        },
        // @ts-ignore
        component: () => import("../components/mobile/InvoicesMain.vue"),
      },
      {
        path: "invoice-details/:warehouse_id/:invoice_id",
        name: "invoice-details",
        meta: {
          requiresAuth: true
        },
        // @ts-ignore
        component: () => import("../components/mobile/InvoicesDetails.vue"),
      }
    ]
  }
];
