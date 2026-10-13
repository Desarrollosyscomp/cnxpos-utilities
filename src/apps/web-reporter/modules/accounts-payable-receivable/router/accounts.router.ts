// ==================== RUTAS: cartera (/web-report-v2/accounts-payable-receivable) ====================
// Página de cartera dentro de WebReporterLayout.
export const AccountsPayableReceivableRouterDesktop = [
  {
    path: "/web-report-v2",
    // @ts-ignore
    component: () => import("../../../layouts/WebReporterLayout.vue"),
    children: [
      {
        path: "accounts-payable-receivable",
        name: "accounts-payable-receivable",
        // @ts-ignore
        component: () => import("../page/DesktopAccountsPayableReceivablePage.vue"),
      },
      
    ]
  }
];
