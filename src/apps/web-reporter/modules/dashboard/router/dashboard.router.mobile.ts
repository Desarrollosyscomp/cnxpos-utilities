export const DashboardRouterMobile = [
    {
        path: "/web-report-v2",
        // @ts-ignore
        component: () => import("../../../layouts/MobileLayout.vue"),
        children: [
          {
            path: "dashboard",
            name: "dashboard",
            meta: {
              requiresAuth: true
            },
            // @ts-ignore
            component: () => import("../pages/MobileDashboardPage.vue"),
          },
          
        ]
      }
]