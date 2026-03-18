import {
    createOverlay,
    createModal,
    mountModal,
    unmountModal,
  } from "./base";
  
  export function confirmAdapter(options: {
    title: string;
    message: string;
  }) {
    return new Promise<boolean>((resolve) => {
      const overlay = createOverlay();
      const modal = createModal();
  
      modal.innerHTML = `
        <h2 class="ba-vanilla-title">${options.title}</h2>
        <p class="ba-vanilla-message">${options.message}</p>
        <div style="display:flex; gap:10px; justify-content:center;">
          <button id="ok" class="ba-vanilla-button">Aceptar</button>
          <button id="cancel" class="ba-vanilla-button">Cancelar</button>
        </div>
      `;
  
      // 🔥 montaje con animación
      mountModal(overlay, modal);
  
      modal.querySelector("#ok")?.addEventListener("click", async () => {
        await unmountModal(overlay, modal);
        resolve(true);
      });
  
      modal.querySelector("#cancel")?.addEventListener("click", async () => {
        await unmountModal(overlay, modal);
        resolve(false);
      });
    });
  }