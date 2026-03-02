export const parseDate = (date: string) => {
  if (!date) return;
  const fecha = new Date(date);
  const fechaFormateada = fecha.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return fechaFormateada;
};

export const parseDateWhitHour = (date: string) => {
  if (!date) return;
  const fecha = new Date(date);
  const fechaFormateada = fecha.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  return fechaFormateada;
};
