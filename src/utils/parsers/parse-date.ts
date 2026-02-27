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
