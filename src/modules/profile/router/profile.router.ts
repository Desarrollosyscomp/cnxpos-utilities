export const ProfileRouterDesktop = [
  {
    path: "/account",
    // @ts-ignore
    component: () => import("../../../layouts/LayoutOne.vue"),
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
