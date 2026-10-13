// ==================== BEAUTY-ALERT VANILLA: adaptadores ====================
// Exporta los adaptadores confirm y doubleInput.
// adapters/vanilla/index.ts
import { confirmAdapter } from "./confirm";
import { doubleInputAdapter } from "./double-input";

export const vanillaAdapters = {
  confirm: confirmAdapter,
  doubleInput: doubleInputAdapter,
};