export const ProfileRouterMobile = [
  {
    path: "/account",
    component: () => import("../../../layouts/MobileLayout.vue"),
    children: [
      {
        path: "profile",
        name: "profile",
        component: () =>
          import("../pages/ProfilePageMobile.vue"),
      },
    ],
  },
];
