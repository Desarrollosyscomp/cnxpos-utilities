import { AlertCore, type Handler } from "./core";
import type { AlertMap, ResultMap } from "./interfaces";

type AdapterMap<M, R extends { [K in keyof M]: any }> = {
  [K in keyof M]: Handler<M[K], R[K]>;
};

function registerAdapters<M extends Record<string, any>, R extends { [K in keyof M]: any }>(
  core: AlertCore<M, R>,
  adapters: Partial<{ [K in keyof M]: Handler<M[K], R[K]> }>
) {
  (Object.keys(adapters) as Array<keyof M>).forEach((key) => {
    const handler = adapters[key];
    if (handler) {
      core.register(key, handler);
    }
  });
}

export function createAlertCore<
  TCustom extends Record<string, any> = {},
  TCustomResults extends { [K in keyof TCustom]: any } = {
    [K in keyof TCustom]: any;
  }
>(
  adapters?: Partial<AdapterMap<AlertMap & TCustom, ResultMap & TCustomResults>>
) {
  type FinalMap = AlertMap & TCustom;
  type FinalResults = ResultMap & TCustomResults;

  const core = new AlertCore<FinalMap, FinalResults>();

  if (adapters) {
    registerAdapters(core, adapters)
  }

  return core;
}