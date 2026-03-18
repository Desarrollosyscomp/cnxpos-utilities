export function createOverlay() {
  const overlay = document.createElement("div");
  overlay.classList.add("ba-vanilla-overlay");
  return overlay;
}

export function createModal() {
  const modal = document.createElement("div");
  modal.classList.add("ba-vanilla-modal");
  return modal;
}

export function mountModal(overlay: HTMLElement, modal: HTMLElement) {
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // trigger animación entrada
  requestAnimationFrame(() => {
    overlay.style.background = "rgba(0,0,0,0.5)";
    modal.style.transform = "scale(1)";
    modal.style.opacity = "1";
  });
}

export function unmountModal(overlay: HTMLElement, modal: HTMLElement) {
  // animación salida
  overlay.style.background = "rgba(0,0,0,0)";
  modal.style.transform = "scale(0.9)";
  modal.style.opacity = "0";

  return new Promise<void>((resolve) => {
    setTimeout(() => {
      overlay.remove();
      resolve();
    }, 200); // mismo tiempo que transition
  });
}
