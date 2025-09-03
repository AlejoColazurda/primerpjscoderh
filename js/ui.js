// ui.js
import { formatMoney, toast, modalConfirm, modalError, modalOk, esEmailValido } from "./utils.js";
import { state, setVIP, addItem, updateQty, removeItem, clearCart, computeTotals, setCupon } from "./cart.js";

let catalogoJuegos = [];
let fuse = null;

// DOM refs y helpers
const $ = (sel) => document.querySelector(sel);

const refs = {
  // secciones
  bienvenida: $("#seccion-bienvenida"),
  catalogo:   $("#seccion-catalogo"),
  carrito:    $("#seccion-carrito"),
  compra:     $("#seccion-compra"),
  confirm:    $("#seccion-confirmacion"),

  // nav
  navInicio:   $("#nav-inicio"),
  navCatalogo: $("#nav-catalogo"),
  navCarrito:  $("#nav-carrito"),
  navComprar:  $("#nav-comprar"),
  mainNav:     $("#main-nav"),
  mobileBtn:   $("#mobile-menu-btn"),

  // footer
  fInicio:   $("#footer-inicio"),
  fCatalogo: $("#footer-catalogo"),
  fCarrito:  $("#footer-carrito"),
  fComprar:  $("#footer-comprar"),

  // elementos varios
  btnComenzar: $("#btn-comenzar"),
  cartIcon:    $("#cart-icon"),
  cartCount:   $("#cart-count"),
  vipStatus:   $("#vip-status"),
  vipDiscount: $("#vip-discount"),

  // catálogo
  buscador:        $("#buscador"),
  filtroCategoria: $("#filtro-categoria"),
  ordenarPor:      $("#ordenar-por"),
  quickId:         $("#quick-id"),
  quickQty:        $("#quick-qty"),
  quickAddBtn:     $("#quick-add-btn"),
  listaJuegos:     $("#lista-juegos"),

  // carrito
  itemsCarrito:     $("#items-carrito"),
  carritoVacio:     $("#carrito-vacio"),
  carritoContenido: $("#carrito-contenido"),
  carritoSubtotal:  $("#carrito-subtotal"),
  carritoDescuento: $("#carrito-descuento"),
  carritoIva:       $("#carrito-iva"),
  carritoTotal:     $("#carrito-total"),
  btnSeguir:        $("#btn-seguir-comprando"),
  btnProcesar:      $("#btn-procesar-compra"),
  cuponInput:       $("#cupon-code"),
  cuponBtn:         $("#btn-aplicar-cupon"),

  // compra
  nombre:   $("#nombre"),
  email:    $("#email"),
  direccion:$("#direccion"),
  ciudad:   $("#ciudad"),
  cp:       $("#cp"),

  metodoPagoEls: document.querySelectorAll(".payment-method"),
  tarjetaDetalles: $("#tarjeta-detalles"),
  tarjetaNumero:   $("#tarjeta-numero"),
  tarjetaNombre:   $("#tarjeta-nombre"),
  tarjetaVenc:     $("#tarjeta-vencimiento"),
  tarjetaCvv:      $("#tarjeta-cvv"),
  tarjetaCuotas:   $("#tarjeta-cuotas"),
  btnConfirmar:    $("#btn-confirmar-compra"),

  // confirmación
  ordenNumero:   $("#orden-numero"),
  fechaEntrega:  $("#fecha-entrega"),
  metodoPago:    $("#metodo-pago"),
  totalPagado:   $("#total-pagado"),
  direccionEnvio:$("#direccion-envio"),
  btnVolver:     $("#btn-volver-inicio"),
};

// ——— Media por juego (puede ser vacío: porque tengo placeholder) ———
const MEDIA = {
  1: [{type:"img", src:"assets/games/1-1.jpg"}, {type:"img", src:"assets/games/1-2.jpg"}, {type:"video", src:"assets/games/1-trailer.mp4"}],
  2: [{type:"img", src:"assets/games/2-1.jpg"}, {type:"img", src:"assets/games/2-2.jpg"}],
  3: [{type:"img", src:"assets/games/3-1.jpg"}],
  4: [{type:"img", src:"assets/games/4-1.jpg"}],
  5: [{type:"img", src:"assets/games/5-1.jpg"}],
  6: [{type:"img", src:"assets/games/6-1.jpg"}],
  7: [{type:"img", src:"assets/games/7-1.jpg"}],
  8: [{type:"img", src:"assets/games/8-1.jpg"}]
};
const PLACEHOLDER = "assets/placeholder.jpg";

// Descripciones cortas (opcional, mejora la ficha)
const DESCRIP = {
  1: "Exploración de mundo abierto y puzles épicos. Obra maestra de aventura.",
  2: "Plataformas 3D con creatividad y re-jugabilidad enormes.",
  3: "Acción intensa en primera persona con multijugador competitivo.",
  4: "Fútbol de próxima generación, licencias y modos en línea.",
  5: "Sandbox creativo para construir, explorar y sobrevivir.",
  6: "Mundo abierto, narrativa y acción en la ciudad de Los Santos.",
  7: "Pase de batalla con recompensas de temporada.",
  8: "RPG futurista con historia profunda y decisiones."
};

function getMediaFor(id) {
  const arr = MEDIA[id] || [];
  if (arr.length) return arr;
  return [{ type: "img", src: PLACEHOLDER }];
}

// ——— Modal de detalle con Swiper ———
export function openDetalleProducto(juego) {
  const disp = (state.stock.get(juego.id) ?? 0);
  const media = getMediaFor(juego.id);

  // Slides HTML
  const slides = media.map(m => {
    if (m.type === "video") {
      return `<div class="swiper-slide">
        <video controls style="width:100%; height:100%; object-fit:cover; border-radius:12px;">
          <source src="${m.src}" type="video/mp4">
        </video>
      </div>`;
    }
    return `<div class="swiper-slide">
      <img src="${m.src}" alt="${juego.nombre}" style="width:100%; height:100%; object-fit:cover; border-radius:12px;">
    </div>`;
  }).join("");

  const detalleHTML = `
    <div class="product-detail" style="display:grid; grid-template-columns: 1.1fr .9fr; gap:16px; align-items:stretch;">
      <div>
        <div class="swiper mySwiper" style="width:100%; height:360px; border-radius:12px; overflow:hidden;">
          <div class="swiper-wrapper">
            ${slides}
          </div>
          <div class="swiper-pagination"></div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      </div>
      <div style="display:flex; flex-direction:column; gap:12px;">
        <h3 style="margin:0; color:var(--primary)">${juego.nombre}</h3>
        <div style="color:var(--gray)">${juego.categoria}</div>
        <div style="font-size:1.3rem; font-weight:700; color:var(--primary)">${formatMoney(juego.precio)}</div>
        <p style="margin:.2rem 0 0">${DESCRIP[juego.id] || "Juego de alta calidad con excelente relación precio/diversión."}</p>
        <div style="font-size:.95rem; color:${disp===0?'var(--danger)':disp<=5?'var(--warning)':'var(--success)'}">
          ${disp===0?'Agotado': disp<=5 ? `Stock bajo: ${disp} unidades` : `${disp} disponibles`}
        </div>

        <div style="display:flex; gap:8px; align-items:center; margin-top:8px;">
          <label for="det-cant">Cantidad</label>
          <input id="det-cant" type="number" min="1" value="1" style="width:90px; padding:6px 8px; border:1px solid var(--light-gray); border-radius:8px;">
        </div>

        <div style="display:flex; gap:10px; margin-top:auto;">
          <button id="det-add" class="btn btn-success" ${disp===0?'disabled':''}><i class="fas fa-cart-plus"></i> Agregar al carrito</button>
          <button id="det-ir-carrito" class="btn btn-outline"><i class="fas fa-shopping-basket"></i> Ver carrito</button>
        </div>
      </div>
    </div>
  `;

  Swal.fire({
    title: "",
    html: detalleHTML,
    width: 900,
    padding: "12px",
    showConfirmButton: false,
    showCloseButton: true,
    didOpen: () => {
      // Iniciar Swiper
      // eslint-disable-next-line no-undef
      new Swiper(".mySwiper", {
        loop: media.length > 1,
        pagination: { el: ".swiper-pagination", clickable: true },
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        keyboard: { enabled: true }
      });

      const addBtn = document.getElementById("det-add");
      const qtyInp = document.getElementById("det-cant");
      const goCart = document.getElementById("det-ir-carrito");

      addBtn?.addEventListener("click", () => {
        const qty = Math.max(1, parseInt(qtyInp.value,10) || 1);
        try {
          addItem(juego, qty);
          toast("✅ Agregado", "success");
          renderBadges(); renderCarrito(); renderCatalogo();
        } catch (e) {
          toast(e.message, "error");
        }
      });

      goCart?.addEventListener("click", () => {
        Swal.close();
        show("carrito");
        renderCarrito();
      });
    }
  });
}

export function setCatalogo(c) {
  catalogoJuegos = c;
}

export function initFuzzy(Fuse) {
  fuse = new Fuse(catalogoJuegos, { keys: ["nombre","categoria"], threshold: 0.4, ignoreLocation:true });
}

export function initCategorias() {
  const sel = refs.filtroCategoria;
  if (!sel) return;
  const cats = [...new Set(catalogoJuegos.map(j => j.categoria))];
  cats.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c; opt.textContent = c;
    sel.appendChild(opt);
  });
}

const aplicarOrden = (arr, criterio) => {
  const [campo, dir] = (criterio || "nombre-asc").split("-");
  const mult = dir === "desc" ? -1 : 1;
  return [...arr].sort((a,b) => ((a[campo] > b[campo]) - (a[campo] < b[campo])) * mult);
};

const filtrarJuegos = (term, cat) => {
  let base = catalogoJuegos;
  if (term?.trim() && fuse) base = fuse.search(term).map(r => r.item);
  if (cat) base = base.filter(j => j.categoria === cat);
  return base;
};

export function renderCatalogo() {
  const term = refs.buscador?.value || "";
  const cat  = refs.filtroCategoria?.value || "";
  const ord  = refs.ordenarPor?.value || "nombre-asc";

  const juegos = aplicarOrden(filtrarJuegos(term, cat), ord);
  refs.listaJuegos.innerHTML = "";

  juegos.forEach(juego => {
    const disp = state.stock.get(juego.id) ?? 0;
    const card = document.createElement("div");
    card.className = "game-card";
    const stockClass = disp === 0 ? "out-of-stock" : (disp <= 5 ? "low-stock" : "in-stock");
    const stockText  = disp === 0 ? "Agotado" : (disp <= 5 ? `Solo ${disp} disponibles` : `${disp} disponibles`);

    card.innerHTML = `
      <div class="game-image"><i class="fas fa-gamepad"></i></div>
      <div class="game-content">
        <h3 class="game-title">${juego.nombre}</h3>
        <span class="game-category">${juego.categoria}</span>
        <div class="game-details">
          <div class="game-price">${formatMoney(juego.precio)}</div>
          <div class="game-stock ${stockClass}">${stockText}</div>
        </div>
        <button class="btn add-to-cart" data-id="${juego.id}" ${disp === 0 ? "disabled" : ""}>
          <i class="fas fa-cart-plus"></i> ${disp === 0 ? "Agotado" : "Agregar al Carrito"}
        </button>
      </div>
    `;
    refs.listaJuegos.appendChild(card);
  });

  refs.listaJuegos.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.getAttribute("data-id"), 10);
      const juego = catalogoJuegos.find(j => j.id === id);
      if (!juego) return;
      try {
        addItem(juego, 1);
        toast(`✅ ${juego.nombre} agregado`, "success");
        renderBadges();
        renderCarrito();
        renderCatalogo();
      } catch (e) {
        toast(e.message, "error");
      }
    });
  });
}

export function renderBadges() {
  // contador carrito
  const total = state.items.reduce((a,i)=>a+i.cantidad,0);
  refs.cartCount.textContent = total;

  // VIP badge
  if (state.vip) refs.vipStatus.classList.remove("hidden");
  else refs.vipStatus.classList.add("hidden");
}

export function renderCarrito() {
  if (state.items.length === 0) {
    refs.carritoVacio.classList.remove("hidden");
    refs.carritoContenido.classList.add("hidden");
    refs.vipDiscount.classList.add("hidden");
    refs.carritoSubtotal.textContent = "$0.00";
    refs.carritoDescuento.textContent = "$0.00";
    refs.carritoIva.textContent = "$0.00";
    refs.carritoTotal.textContent = "$0.00";
    return;
  }

  refs.carritoVacio.classList.add("hidden");
  refs.carritoContenido.classList.remove("hidden");
  refs.itemsCarrito.innerHTML = "";

  state.items.forEach((item, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        <div style="display:flex; align-items:center; gap:10px;">
          <div class="cart-item-img"><i class="fas fa-gamepad"></i></div>
          <div>
            <div class="cart-item-name">${item.nombre}</div>
            <div class="cart-item-category">${item.categoria}</div>
          </div>
        </div>
      </td>
      <td>${formatMoney(item.precio)}</td>
      <td>
        <div class="cart-quantity">
          <button class="quantity-btn" data-idx="${idx}" data-act="dec">-</button>
          <span>${item.cantidad}</span>
          <button class="quantity-btn" data-idx="${idx}" data-act="inc">+</button>
        </div>
      </td>
      <td>${formatMoney(item.subtotal)}</td>
      <td><button class="cart-remove" data-idx="${idx}"><i class="fas fa-trash"></i></button></td>
    `;
    refs.itemsCarrito.appendChild(tr);
  });

  // Totales
  const totals = computeTotals({});
  refs.carritoSubtotal.textContent = formatMoney(totals.subtotal);
  refs.carritoDescuento.textContent = totals.montoDescuento ? `- ${formatMoney(totals.montoDescuento)}` : "$0.00";
  refs.carritoIva.textContent = `+ ${formatMoney(totals.iva)}`;
  refs.carritoTotal.textContent = formatMoney(totals.total);

  if (state.vip || totals.d > 0) refs.vipDiscount.classList.remove("hidden");
  else refs.vipDiscount.classList.add("hidden");

  // Listeners cantidad / quitar
  document.querySelectorAll(".quantity-btn").forEach(b=>{
    b.addEventListener("click", () => {
      const idx = parseInt(b.getAttribute("data-idx"),10);
      const act = b.getAttribute("data-act");
      const id = state.items[idx]?.id;
      if (!id) return;
      try {
        updateQty(id, act === "inc" ? 1 : -1);
        renderBadges(); renderCarrito(); renderCatalogo();
      } catch (e) {
        toast(e.message, "error");
      }
    });
  });
  document.querySelectorAll(".cart-remove").forEach(b=>{
    b.addEventListener("click", () => {
      const idx = parseInt(b.getAttribute("data-idx"),10);
      const id = state.items[idx]?.id;
      if (!id) return;
      removeItem(id);
      toast("🗑️ Eliminado", "warning");
      renderBadges(); renderCarrito(); renderCatalogo();
    });
  });
}

// —————— Navegación y acciones ——————
export function bindUI(Fuse, dayjs) {
  // nav
  [refs.navInicio, refs.fInicio].forEach(a=>a?.addEventListener("click",(e)=>{ e.preventDefault(); show("bienvenida"); }));
  [refs.navCatalogo, refs.fCatalogo].forEach(a=>a?.addEventListener("click",(e)=>{ e.preventDefault(); show("catalogo"); renderCatalogo(); }));
  [refs.navCarrito, refs.fCarrito, refs.cartIcon].forEach(a=>a?.addEventListener("click",(e)=>{ e.preventDefault(); show("carrito"); renderCarrito(); }));
  [refs.navComprar, refs.fComprar].forEach(a=>a?.addEventListener("click", async (e)=>{
    e.preventDefault();
    if (state.items.length === 0) return toast("Tu carrito está vacío", "warning");
    show("compra");
  }));

  refs.mobileBtn?.addEventListener("click", ()=> refs.mainNav.classList.toggle("active"));

  // Inicio → VIP
  refs.btnComenzar?.addEventListener("click", async ()=>{
    const { isConfirmed } = await Swal.fire({
      title: "¿Sos cliente VIP?",
      text: "Los VIP tienen 20% OFF automático",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, soy VIP",
      cancelButtonText: "No"
    });
    setVIP(!!isConfirmed);
    renderBadges();
    show("catalogo"); renderCatalogo();
  });

  // Filtros catálogo
  refs.buscador?.addEventListener("input", renderCatalogo);
  refs.filtroCategoria?.addEventListener("change", renderCatalogo);
  refs.ordenarPor?.addEventListener("change", renderCatalogo);

  // Quick add por ID
  refs.quickAddBtn?.addEventListener("click", ()=>{
    const id  = parseInt(refs.quickId.value,10);
    const qty = parseInt(refs.quickQty.value,10) || 1;
    const juego = catalogoJuegos.find(j => j.id === id);
    if (!juego) return toast("ID inexistente", "error");
    try {
      addItem(juego, qty);
      toast("✅ Agregado", "success");
      renderBadges(); renderCarrito(); renderCatalogo();
    } catch(e){ toast(e.message, "error"); }
  });

  // Carrito → Acciones
  refs.btnSeguir?.addEventListener("click", ()=>{ show("catalogo"); renderCatalogo(); });
  refs.btnProcesar?.addEventListener("click", async ()=>{
    if (state.items.length === 0) return toast("Tu carrito está vacío", "warning");
    const r = await modalConfirm("¿Finalizamos tu compra?", "Podés revisar los datos de envío y pago.");
    if (r.isConfirmed) show("compra");
  });

  // Cupón
  refs.cuponBtn?.addEventListener("click", ()=>{
    const code = (refs.cuponInput?.value || "").toUpperCase().trim();
    setCupon(code);
    toast(code ? `Cupón aplicado: ${code}` : "Sin cupón", "info");
    renderCarrito();
  });

  // Pago: selección de método
  refs.metodoPagoEls.forEach(el=>{
    el.addEventListener("click", ()=>{
      refs.metodoPagoEls.forEach(e=>e.classList.remove("selected"));
      el.classList.add("selected");
      const method = el.getAttribute("data-method");
      refs.tarjetaDetalles.classList.toggle("hidden", !(method === "credito" || method === "debito"));
      // cuotas sólo en crédito
      refs.tarjetaCuotas?.closest(".form-group")?.classList.toggle("hidden", method !== "credito");
      refs.tarjetaCuotas.value = "1";
      refs.metodoPagoEls.forEach(e=>e.blur());
      el.blur();
    });
  });

  // Confirmar compra
  refs.btnConfirmar?.addEventListener("click", async ()=>{
    try {
      const nombre = refs.nombre.value.trim();
      const email = refs.email.value.trim();
      const direccion = refs.direccion.value.trim();
      const ciudad = refs.ciudad.value.trim();
      const cp = refs.cp.value.trim();

      if (!nombre) throw new Error("Nombre es obligatorio.");
      if (!esEmailValido(email)) throw new Error("Email inválido.");
      if (!direccion) throw new Error("Dirección es obligatoria.");
      if (!ciudad) throw new Error("Ciudad es obligatoria.");
      if (!cp) throw new Error("CP es obligatorio.");

      // método
      const selected = Array.from(refs.metodoPagoEls).find(e=>e.classList.contains("selected"));
      if (!selected) throw new Error("Elegí un método de pago.");
      const method = selected.getAttribute("data-method");

      // tarjeta si aplica
      if (method === "credito" || method === "debito") {
        const num = refs.tarjetaNumero.value.trim();
        const nom = refs.tarjetaNombre.value.trim();
        const ven = refs.tarjetaVenc.value.trim();
        const cvv = refs.tarjetaCvv.value.trim();
        if (!num || !nom || !ven || !cvv) throw new Error("Completá los datos de la tarjeta.");
        // validación simple
        if (num.replace(/\D/g,"").length < 13) throw new Error("Número de tarjeta inválido.");
      }

      // Calcular totales (con cupón/IVA) + envío + cuotas
      const totals = computeTotals({});
      const envio = costoEnvio(cp); // función abajo
      let totalFinal = totals.total + envio;
      let detalleCuotas = "";

      if (method === "credito") {
        const cuotas = parseInt(refs.tarjetaCuotas.value,10) || 1;
        const coef = PLANES_CUOTAS[String(cuotas)] || 1;
        totalFinal = totalFinal * coef;
        const montoCuota = totalFinal / cuotas;
        detalleCuotas = ` (${cuotas} cuotas de ${formatMoney(montoCuota)})`;
      }

      // Simular pago 95% OK
      const ok = Math.random() > 0.05;
      if (!ok) return modalError("Pago rechazado", "Hubo un problema con el pago. Probá nuevamente.");

      // Confirmación
      const nro = "GS-" + Math.floor(100000 + Math.random() * 900000);
      const entrega = dayjs().add(3, "day").format("DD/MM/YYYY");

      refs.ordenNumero.textContent = nro;
      refs.fechaEntrega.textContent = entrega;
      refs.metodoPago.textContent = method === "credito" ? "Tarjeta de Crédito"
                                   : method === "debito" ? "Tarjeta de Débito"
                                   : method === "paypal" ? "PayPal" : "Efectivo";
      refs.totalPagado.textContent = formatMoney(totalFinal) + detalleCuotas;
      refs.direccionEnvio.textContent = `${direccion}, ${ciudad} (${cp})`;

      clearCart();
      renderBadges(); renderCarrito(); renderCatalogo();
      show("confirm");
      toast("✅ Compra exitosa", "success");

    } catch (e) {
      modalError("Verificá los datos", e.message || "Revisá el formulario.");
    }
  });

  refs.btnVolver?.addEventListener("click", ()=>{
    // limpiar form visual
    [refs.nombre, refs.email, refs.direccion, refs.ciudad, refs.cp,
     refs.tarjetaNumero, refs.tarjetaNombre, refs.tarjetaVenc, refs.tarjetaCvv].forEach(el=>{ if (el) el.value = ""; });
    refs.metodoPagoEls.forEach(e=>e.classList.remove("selected"));
    refs.tarjetaDetalles.classList.add("hidden");
    refs.tarjetaCuotas.value = "1";
    show("bienvenida");
  });
}

// Envío y cuotas
export const costoEnvio = (cp) => {
  const n = parseInt(cp, 10);
  if (Number.isNaN(n)) return 0;
  if (n < 3000) return 0;
  if (n <= 5000) return 1500;
  return 2500;
};
export const PLANES_CUOTAS = { "1":1.00, "3":1.05, "6":1.12 };

// Secciones
export function show(section) {
  const map = { bienvenida: refs.bienvenida, catalogo: refs.catalogo, carrito: refs.carrito, compra: refs.compra, confirm: refs.confirm };
  Object.values(map).forEach(s => s?.classList.add("hidden"));
  map[section]?.classList.remove("hidden");
  // nav active
  document.querySelectorAll("nav a").forEach(a=>a.classList.remove("active"));
  if (section === "bienvenida") refs.navInicio?.classList.add("active");
  if (section === "catalogo")  refs.navCatalogo?.classList.add("active");
  if (section === "carrito")   refs.navCarrito?.classList.add("active");
  if (section === "compra")    refs.navComprar?.classList.add("active");
}
