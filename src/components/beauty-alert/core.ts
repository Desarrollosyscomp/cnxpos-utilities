export type Handler<TOptions, TResult> = (options: TOptions) => Promise<TResult>;

export class AlertCore<
    TMap extends Record<string, any>,
    TResultMap extends { [K in keyof TMap]: any }
> {    
  private registry = new Map<keyof TMap, Handler<any, any>>();

  register<K extends keyof TMap>(
    type: K,
    handler: Handler<TMap[K], TResultMap[K]>
  ) {
    this.registry.set(type, handler);
  }

  async show<K extends keyof TMap>(
    type: K,
    options: TMap[K]
  ): Promise<TResultMap[K]> {
    const handler = this.registry.get(type);

    if (!handler) {
      throw new Error(`Alert "${String(type)}" no existe`);
    }

    return handler(options);
  }
}