// ==================== TIPO: TSummaryRangeSales ====================
// Resumen del rango: ventas, costo, devoluciones, utilidad.
export type TSummaryRangeSales = {
  subtotal: number;
  totalSales: number;
  totalProducts: number;
  totalInvoices: number;
  totalTaxes: number;
  totalCost: number;
  totalReturns: number;
  salesMinusReturns: number;
  discounts: number;
  totalProfit: number;
};
