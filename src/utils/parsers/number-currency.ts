// ==================== UTILIDAD: formato de moneda ====================
// Formatea un número como pesos colombianos (es-CO, COP).
export const numberToCurrency = (number: number): string => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(number);
  };