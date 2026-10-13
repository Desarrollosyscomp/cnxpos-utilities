// ==================== RUTAS: dashboard móvil ====================
// Misma ruta /web-report-v2/dashboard para el router móvil.
export const DashboardRouterMobile = [
    {
        path: "/web-report-v2",
        // @ts-ignore
        component: () => import("../../../layouts/WebReporterLayout.vue"),
        children: [
          {
            path: "dashboard",
            name: "dashboard",
            meta: {
              requiresAuth: true
            },
            // @ts-ignore
            component: () => import("../pages/DashboardPage.vue"),
          },
          
        ]
      }
]