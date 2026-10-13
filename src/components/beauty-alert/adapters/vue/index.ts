// ==================== BEAUTY-ALERT VUE: adaptadores ====================
// Exporta los adaptadores confirm y timer basados en componentes Vue.
// adapters/vanilla/index.ts
import { confirmAdapter } from "./confirm";
import { timerAdapter } from "./timer";

export const vueAdapters = {
  confirm: confirmAdapter,
  timer: timerAdapter,
};