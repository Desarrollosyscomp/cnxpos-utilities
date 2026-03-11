export const ProfileRouterMobile = [
  {
    path: "/account",
    // @ts-ignore
    component: () => import("../../../layouts/MobileLayout.vue"),
    children: [
      {
        path: "profile",
        name: "profile",
        // @ts-ignore
        component: () =>
          import("../pages/ProfilePage.vue"),
      },
    ],
  },
];
