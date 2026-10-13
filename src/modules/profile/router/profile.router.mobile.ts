// ==================== RUTAS: perfil móvil (/account/profile) ====================
// Pantalla de perfil dentro de MobileLayout.
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
