import { createApp } from "vue";
import ConfirmComponent from "./ConfirmComponent.vue";

export function confirmAdapter(options: {
  title: string;
  message: string;
}) {
  return new Promise<boolean>((resolve) => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const app = createApp(ConfirmComponent, {
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