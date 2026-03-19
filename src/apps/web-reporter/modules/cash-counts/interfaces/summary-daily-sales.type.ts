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
  paymentMethods: Array<TPaymentMethod>;
};

export type TPaymentMethod = {
  payment_id: number;
  payment_name: string;
  payment_total: number;
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
