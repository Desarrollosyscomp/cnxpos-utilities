import { createApp } from "vue";
import TimerComponent from "./TimerComponent.vue";

export function timerAdapter(options: {
  title: string;
  message: string;
}) {
  return new Promise<boolean>((resolve) => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const app = createApp(TimerComponent, {
      ...options,
      onResolve: (value: boolean) => {
        resolve(value);
        app.unmount();
        container.remove();
      },
    });

    app.mount(container);
  });
}