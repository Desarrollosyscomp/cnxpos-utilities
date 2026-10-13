// ==================== RUTAS: inventario móvil ====================
// Misma ruta con InventoryLayoutMobile.
export const ReportInventoryRouterMobile = [
  {
    path: "/inventory",
    // @ts-ignore
    component: () => import("../../../layouts/InventoryLayoutMobile.vue"),
    children: [
      {
        path: "report-inventory",
        name: "report-inventory",
        // @ts-ignore
        // component: () => import("../../sales-by-range/components/desktop/DesktopRangeSalesMain.vue"),
        component: () => import("../pages/MobileReportInventoryPage.vue"),
      },
      
    ]
  }
];
