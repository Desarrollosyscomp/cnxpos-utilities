export const DashboardRouter = [
  {
    path: "/web-report-v2",
    // @ts-ignore
    component: () => import("../../../layouts/WebReporterLayout.vue"),
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        meta: {
          requiresAuth: true,
        },
        // @ts-ignore
        component: () => import("../pages/DashboardPage.vue"),
      },
    ],
  },
];
