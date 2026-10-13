// ==================== RUTAS: home móvil (sin uso) ====================
// Variante móvil de /home/welcome; no está registrada en router/index.mobile.ts.
export const HomeRouter = [
    {
        path: "/home",
        // @ts-ignore
        component: () => import("../../../layouts/MobileLayout.vue"),
        children: [
          {
            path: "welcome",
            name: "welcome",
            // @ts-ignore
            component: () => import("../pages/MobileHomePage.vue"),
          },
          
        ]
      }
]