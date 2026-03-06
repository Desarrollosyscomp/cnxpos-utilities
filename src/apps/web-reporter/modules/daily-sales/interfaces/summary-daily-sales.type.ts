export type TSummary = {
  totalSales: number;
  totalProducts: number;
  totalInvoices: number;
  totalCost: number;
  totalProfit: number;
};

export type TSummaryInvoices = {
  subtotal: number;
  totalTaxes: number;
  totalSales: number;
};

export type TSummaryInvoiceDetails = {
  subtotal: number;
  valueAddedTax: number;
  totalDiscounts: number;
  totalSale: number;
  customer: string;
  profit: number;
  totalItems: number;
};
