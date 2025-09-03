// main.js
import { loadCatalog } from "./api.js";
import { hydrateState, setStockFromCatalog } from "./cart.js";
import { renderCatalogo, renderBadges, renderCarrito, bindUI, setCatalogo, initFuzzy, initCategorias, show } from "./ui.js";

// Cargar libs globales (SweetAlert2, Toastify, dayjs, Fuse) vienen por CDN en index.html (window.*)
const ensureLibs = () => {
  if (!window.Swal || !window.Toastify || !window.dayjs || !window.Fuse) {
    alert("Faltan librerías externas (SweetAlert2 / Toastify / dayjs / Fuse). Verificá el index.html");
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  ensureLibs();

  // Estado previo
  hydrateState();

  // Cargar catálogo remoto con fallback
  const catalogo = await loadCatalog();
  setCatalogo(catalogo);
  setStockFromCatalog(catalogo);

  // Inicializar búsqueda difusa y categorías
  initFuzzy(window.Fuse);
  initCategorias();

  // Bind de eventos y render inicial
  bindUI(window.Fuse, window.dayjs);
  renderBadges();
  renderCatalogo();
  renderCarrito();
  show("bienvenida");
});
