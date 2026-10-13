// ==================== TIPOS: resúmenes de ventas del día ====================
// Resumen del día, de las facturas de un almacén, medios de pago y detalle de factura.
export type TSummary = {
  totalSales: number;
  totalProducts: number;
  totalInvoices: number;
  totalCost: number;
  totalProfit: number;
  totalReturns: number;
  discounts: number;
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
  paymentMethods: Array<TPaymentMethod>;
};
