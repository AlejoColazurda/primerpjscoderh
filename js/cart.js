// cart.js
import { readLS, writeLS } from "./utils.js";

export const CONST = {
  IVA: 0.21,
  D3: 0.10,
  D5: 0.15,
  VIP: 0.20,
  CUPONES: { CODER10: 0.10, VIP20: 0.20 }
};

export const LS_KEY = "pf_state_v1";

export const state = {
  vip: false,
  cuponCode: "",
  items: [],        // [{id,nombre,precio,categoria,cantidad,subtotal}]
  stock: new Map()  // id -> stock disponible
};

export const hydrateState = () => {
  const saved = readLS(LS_KEY);
  if (!saved) return;
  state.vip = !!saved.vip;
  state.cuponCode = saved.cuponCode || "";
  state.items = Array.isArray(saved.items) ? saved.items : [];
  state.stock = new Map(saved.stockArray || []);
};

export const persistState = () => {
  writeLS(LS_KEY, {
    vip: state.vip,
    cuponCode: state.cuponCode,
    items: state.items,
    stockArray: Array.from(state.stock.entries())
  });
};

export const setStockFromCatalog = (catalogo) => {
  // si ya tenía stock en LS, conservar valores actuales; si no, inicializar
  if (state.stock.size === 0) {
    state.stock = new Map(catalogo.map(j => [j.id, j.stock]));
  } else {
    // asegurar que todos los ids existan
    catalogo.forEach(j => { if (!state.stock.has(j.id)) state.stock.set(j.id, j.stock); });
  }
};

export const setVIP = (flag) => { state.vip = !!flag; persistState(); };
export const setCupon = (code) => { state.cuponCode = (code || "").toUpperCase().trim(); persistState(); };

export const addItem = (juego, qty = 1) => {
  qty = Math.max(1, parseInt(qty, 10) || 1);
  const disp = state.stock.get(juego.id) ?? 0;
  if (qty > disp) throw new Error(`Stock insuficiente. Quedan ${disp}.`);
  let it = state.items.find(i => i.id === juego.id);
  if (!it) {
    it = { id: juego.id, nombre: juego.nombre, precio: juego.precio, categoria: juego.categoria, cantidad: 0, subtotal: 0 };
    state.items.push(it);
  }
  it.cantidad += qty;
  it.subtotal  = it.cantidad * it.precio;
  state.stock.set(juego.id, disp - qty);
  persistState();
};

export const updateQty = (id, delta) => {
  const it = state.items.find(i => i.id === id);
  if (!it) return;
  if (delta > 0) {
    const disp = state.stock.get(id) ?? 0;
    if (disp <= 0) throw new Error("Sin stock.");
    it.cantidad += 1;
    state.stock.set(id, disp - 1);
  } else {
    it.cantidad -= 1;
    state.stock.set(id, (state.stock.get(id) ?? 0) + 1);
    if (it.cantidad <= 0) {
      removeItem(id);
      return;
    }
  }
  it.subtotal = it.cantidad * it.precio;
  persistState();
};

export const removeItem = (id) => {
  const it = state.items.find(i => i.id === id);
  if (!it) return;
  state.stock.set(id, (state.stock.get(id) ?? 0) + it.cantidad);
  state.items = state.items.filter(i => i.id !== id);
  persistState();
};

export const clearCart = () => {
  state.items = [];
  persistState();
};

const descuentoPorCantidad = (totalJuegos) =>
  totalJuegos >= 5 ? CONST.D5 : (totalJuegos >= 3 ? CONST.D3 : 0);

export const computeTotals = ({ vip = state.vip, cuponCode = state.cuponCode } = {}) => {
  const subtotal = state.items.reduce((a, i) => a + i.subtotal, 0);
  const totalJuegos = state.items.reduce((a, i) => a + i.cantidad, 0);

  const dByQty = descuentoPorCantidad(totalJuegos);
  const dVip   = vip ? CONST.VIP : 0;
  const dCupon = CONST.CUPONES[(cuponCode || "").toUpperCase()] || 0;

  // política simple: tomar el MAYOR descuento (evitamos stacking raro)
  const d = Math.max(dByQty, dVip, dCupon);

  const montoDescuento = subtotal * d;
  const base = subtotal - montoDescuento;
  const iva  = base * CONST.IVA;
  const total = base + iva;

  return { subtotal, d, montoDescuento, iva, total, totalJuegos };
};
