// api.js
import { log } from "./utils.js";

const CATALOG_URL = "./data/catalogo.json";

// Fallback local por si falla el fetch
const FALLBACK = [
  { id: 1, nombre: "The Legend of Zelda: Breath of the Wild", precio: 59.99, categoria: "Aventura",     stock: 15 },
  { id: 2, nombre: "Super Mario Odyssey",                       precio: 49.99, categoria: "Plataformas", stock: 20 },
  { id: 3, nombre: "Call of Duty: Modern Warfare",              precio: 69.99, categoria: "Acción",      stock: 12 },
  { id: 4, nombre: "FIFA 24",                                   precio: 59.99, categoria: "Deportes",    stock: 25 },
  { id: 5, nombre: "Minecraft",                                 precio: 29.99, categoria: "Sandbox",     stock: 30 },
  { id: 6, nombre: "Grand Theft Auto V",                        precio: 39.99, categoria: "Acción",      stock: 18 },
  { id: 7, nombre: "Fortnite Battle Pass",                      precio:  9.99, categoria: "Battle Royale", stock:100 },
  { id: 8, nombre: "Cyberpunk 2077",                            precio: 49.99, categoria: "RPG",         stock: 8  }
];

export async function loadCatalog() {
  try {
    const res = await fetch(CATALOG_URL, { cache: "no-store" });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    return Array.isArray(data) ? data : FALLBACK;
  } catch (e) {
    log("Fallo cargar catalogo, uso fallback:", e);
    return FALLBACK;
  }
}
