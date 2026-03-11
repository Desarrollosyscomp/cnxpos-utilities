export const ProfileRouterDesktop = [
  {
    path: "/account",
    // @ts-ignore
    component: () => import("../../../layouts/DesktopLayout.vue"),
    children: [
      {
        path: "profile",
        name: "profile",
        // @ts-ignore
        component: () => import("../pages/ProfilePage.vue"),
      },
    ],
  },
];
