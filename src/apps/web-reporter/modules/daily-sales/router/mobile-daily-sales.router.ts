// ==================== RUTAS: ventas del día móvil (/daily-sales/daily-sales) ====================
// Variante móvil con WebReporterLayoutMobile.
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
