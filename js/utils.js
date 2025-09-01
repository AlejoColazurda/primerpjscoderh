// utils.js
export const DEBUG = false;
export const log = (...a) => { if (DEBUG) console.log(...a); };

// Toast y Modales (SweetAlert2 + Toastify)
export const toast = (text, type = "info") => {
  Toastify({
    text,
    gravity: "top",
    position: "right",
    duration: 1800,
    stopOnFocus: true,
    className: type // "info" | "success" | "error" | "warning"
  }).showToast();
};

export const modalConfirm = (title, text) =>
  Swal.fire({
    title, text, icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sí",
    cancelButtonText: "Cancelar"
  });

export const modalError = (title, text) =>
  Swal.fire({ title, text, icon: "error" });

export const modalOk = (title, text) =>
  Swal.fire({ title, text, icon: "success" });

// Helpers
export const formatMoney = (n) => `$${Number(n || 0).toFixed(2)}`;
export const must = (v, msg) => (v && v.trim && v.trim()) ? v.trim() : (() => { throw new Error(msg); })();

export const esEmailValido = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");

export const esTarjetaValida = (num) => {
  const s = (num || "").replace(/\D/g, "");
  return s.length >= 13 && s.length <= 19;
};

export const readLS = (k, fallback = null) => {
  try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
};
export const writeLS = (k, v) => {
  try { localStorage.setItem(k, JSON.stringify(v)); } catch {}
};
