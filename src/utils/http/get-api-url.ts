// ==================== UTILIDAD: URL de la API ====================
// Desarrollo → VITE_NEST_API_URL; build de producción → VITE_QA_API_URL.
export const getApiUrl = () => {
    return import.meta.env.PROD ? import.meta.env.VITE_QA_API_URL : import.meta.env.VITE_NEST_API_URL;
}