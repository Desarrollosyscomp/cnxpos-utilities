import {
  createOverlay,
  createModal,
  mountModal,
  unmountModal,
} from "./base";

export function doubleInputAdapter(options: {
  title: string;
  message: string;
  description: string;
  value?: {
    first?: string;
    second?: string;
  };
}) {
  return new Promise<{ first: string; second: string } | null>((resolve) => {
    const overlay = createOverlay();
    const modal = createModal();

    modal.innerHTML = `
    <div class="confirm-modal">
      <h2 class="ba-vanilla-title">${options.title}</h2>
      <p class="ba-vanilla-message">${options.message}</p>
      <small class="ba-vanilla-description">
        ${options.description}
      </small>
      <input id="input1" class="ba-vanilla-input" placeholder="Valor 1" />

      <input id="input2" class="ba-vanilla-input" placeholder="Valor 2" />

      <div style="display:flex; gap:10px; justify-content:flex-end;">
        <button id="cancel" class="ba-vanilla-button">Cancelar</button>
        <button id="ok" class="ba-vanilla-button">Aceptar</button>
      </div>
    </div>
    `;

    mountModal(overlay, modal);

    const input1 = modal.querySelector<HTMLInputElement>("#input1")!;
    const input2 = modal.querySelector<HTMLInputElement>("#input2")!;

    if (options.value?.first) input1.value = options.value.first;
    if (options.value?.second) input2.value = options.value.second;

    modal.querySelector("#ok")?.addEventListener("click", async () => {
      const result = {
        first: input1.value,
        second: input2.value,
      };

      await unmountModal(overlay, modal);
      resolve(result);
    });

    modal.querySelector("#cancel")?.addEventListener("click", async () => {
      await unmountModal(overlay, modal);
      resolve(null);
    });

    // 🔥 click fuera = cancelar
    overlay.addEventListener("click", async (e) => {
      if (e.target === overlay) {
        await unmountModal(overlay, modal);
        resolve(null);
      }
    });
  });
}