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

export const formatDateWithHyphen = (date: string) => {
  if (!date || date.length !== 8) return date;

  return `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`;
};
