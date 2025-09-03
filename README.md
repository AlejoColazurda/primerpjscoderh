**Estim (Simulador de Ecommerce de Videojuegos)**

Simulador interactivo de Ecommerce desarrollado en HTML + CSS + JavaScript (ES Modules).
Permite explorar un catálogo, ver fichas detalladas con carrusel de imágenes y videos, agregar productos al carrito, aplicar descuentos (por cantidad, VIP y cupones), calcular impuestos y envío, seleccionar método de pago (con cuotas simuladas) y finalizar la compra con una confirmación completa.

Estado: activo y en mejora continua.

 **Demo**🖥️

GitHub Pages: (https://alejocolazurda.github.io/primerpjscoderh/)

 **Stack & Librerías**🧱

Base: HTML5, CSS3, JavaScript (ESM, sin frameworks)

UI/UX:

[SweetAlert2] — Modales accesibles (confirmaciones, errores, detalle de producto)

[Toastify] — Notificaciones “toast”

[Swiper] — Carrusel de imágenes y videos en la ficha de producto

Utilidades:

[day.js] — Manejo/formatos de fechas

[Fuse.js] — Búsqueda tolerante a errores (fuzzy search)

Datos remotos: data/catalogo.json (carga asincrónica con fallback local)

Las librerías se cargan por CDN (sin build step).

**Funcionalidades principales**✨

Catálogo interactivo con búsqueda (fuzzy), filtros por categoría y ordenamiento.

Ficha “Ver más” con carrusel (imágenes + videos), descripción, stock y Agregar al carrito.

Carrito con actualización en vivo de cantidades y eliminación de ítems.

Descuentos:

3–4 juegos: 10%

5 o más juegos: 15%

Cliente VIP: 20%

Cupones: CODER10 (10%), VIP20 (20%)

Política simple: se aplica el mayor descuento de los disponibles.

Impuestos: IVA 21%.

Envío (simulado por CP):

< 3000: $0

3000–5000: $1500

> 5000: $2500

Pago: crédito (1, 3, 6 cuotas), débito, PayPal, efectivo.

Coeficientes de crédito: 1x 0%, 3x +5%, 6x +12%

Confirmación: número de orden, fecha de entrega (+3 días), método de pago, total y dirección.

Persistencia: localStorage para carrito/estado VIP/cupón/stock.

Accesibilidad & UX: focus claro, toasts aria-live, navegación con teclado en carrusel.
