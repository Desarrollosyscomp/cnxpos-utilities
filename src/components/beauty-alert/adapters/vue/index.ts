// adapters/vanilla/index.ts
import { confirmAdapter } from "./confirm";
import { timerAdapter } from "./timer";

export const vueAdapters = {
  confirm: confirmAdapter,
  timer: timerAdapter,
};