export const AccountsPayableReceivableRouterMobile = [
  {
    path: "/web-report-v2",
    // @ts-ignore
    component: () => import("../../../layouts/WebReporterLayoutMobile.vue"),
    children: [
      {
        path: "accounts-payable-receivable",
        name: "accounts-payable-receivable",
        // @ts-ignore
        component: () => import("../page/MobileAccountsPayableReceivablePage.vue"),
      },
      
    ]
  }
];
