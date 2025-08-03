// 
// ==================== CONSTANTES Y VARIABLES ====================
const DESCUENTO_3_JUEGOS = 0.1; // 10% descuento por 3 juegos
const DESCUENTO_5_JUEGOS = 0.15; // 15% descuento por 5 juegos
const DESCUENTO_VIP = 0.2; // 20% descuento VIP
const IVA = 0.21; // 21% IVA

let carritoCompras = [];
let clienteVIP = false;
let metodoPagoSeleccionado = null;

// Catálogo de videojuegos
const catalogoJuegos = [
    { id: 1, nombre: "The Legend of Zelda: Breath of the Wild", precio: 59.99, categoria: "Aventura", stock: 15 },
    { id: 2, nombre: "Super Mario Odyssey", precio: 49.99, categoria: "Plataformas", stock: 20 },
    { id: 3, nombre: "Call of Duty: Modern Warfare", precio: 69.99, categoria: "Acción", stock: 12 },
    { id: 4, nombre: "FIFA 24", precio: 59.99, categoria: "Deportes", stock: 25 },
    { id: 5, nombre: "Minecraft", precio: 29.99, categoria: "Sandbox", stock: 30 },
    { id: 6, nombre: "Grand Theft Auto V", precio: 39.99, categoria: "Acción", stock: 18 },
    { id: 7, nombre: "Fortnite Battle Pass", precio: 9.99, categoria: "Battle Royale", stock: 100 },
    { id: 8, nombre: "Cyberpunk 2077", precio: 49.99, categoria: "RPG", stock: 8 },
];

// ==================== REFERENCIAS DEL DOM ====================
// Secciones
const seccionBienvenida = document.getElementById('seccion-bienvenida');
const seccionCatalogo = document.getElementById('seccion-catalogo');
const seccionCarrito = document.getElementById('seccion-carrito');
const seccionCompra = document.getElementById('seccion-compra');
const seccionConfirmacion = document.getElementById('seccion-confirmacion');

// Navegación
const navInicio = document.getElementById('nav-inicio');
const navCatalogo = document.getElementById('nav-catalogo');
const navCarrito = document.getElementById('nav-carrito');
const navComprar = document.getElementById('nav-comprar');
const mainNav = document.getElementById('main-nav');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');

// Elementos varios
const btnComenzar = document.getElementById('btn-comenzar');
const cartIcon = document.getElementById('cart-icon');
const cartCount = document.getElementById('cart-count');
const listaJuegos = document.getElementById('lista-juegos');
const itemsCarrito = document.getElementById('items-carrito');
const carritoVacio = document.getElementById('carrito-vacio');
const carritoContenido = document.getElementById('carrito-contenido');
const carritoSubtotal = document.getElementById('carrito-subtotal');
const carritoDescuento = document.getElementById('carrito-descuento');
const carritoIva = document.getElementById('carrito-iva');
const carritoTotal = document.getElementById('carrito-total');
const vipStatus = document.getElementById('vip-status');
const vipDiscount = document.getElementById('vip-discount');
const btnSeguirComprando = document.getElementById('btn-seguir-comprando');
const btnProcesarCompra = document.getElementById('btn-procesar-compra');
const btnConfirmarCompra = document.getElementById('btn-confirmar-compra');
const btnVolverInicio = document.getElementById('btn-volver-inicio');
const buscador = document.getElementById('buscador');
const tarjetaDetalles = document.getElementById('tarjeta-detalles');
const metodoPagoElements = document.querySelectorAll('.payment-method');

// Elementos de confirmación
const ordenNumero = document.getElementById('orden-numero');
const fechaEntrega = document.getElementById('fecha-entrega');
const metodoPago = document.getElementById('metodo-pago');
const totalPagado = document.getElementById('total-pagado');
const direccionEnvio = document.getElementById('direccion-envio');

// ==================== FUNCIONES PRINCIPALES ====================
// Función para iniciar el simulador
function iniciarSimulador() {
    // Cargar datos del localStorage si existen
    cargarDatosLocalStorage();
    
    // Actualizar la interfaz
    actualizarInterfaz();
    
    // Mostrar sección de bienvenida
    mostrarSeccion('bienvenida');
    
    // Registrar event listeners
    registrarEventListeners();
}

// Función para mostrar una sección específica
function mostrarSeccion(seccion) {
    // Ocultar todas las secciones
    seccionBienvenida.classList.add('hidden');
    seccionCatalogo.classList.add('hidden');
    seccionCarrito.classList.add('hidden');
    seccionCompra.classList.add('hidden');
    seccionConfirmacion.classList.add('hidden');
    
    // Actualizar navegación
    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
    
    // Mostrar la sección solicitada
    switch(seccion) {
        case 'bienvenida':
            seccionBienvenida.classList.remove('hidden');
            navInicio.classList.add('active');
            break;
        case 'catalogo':
            seccionCatalogo.classList.remove('hidden');
            navCatalogo.classList.add('active');
            renderizarCatalogo();
            break;
        case 'carrito':
            seccionCarrito.classList.remove('hidden');
            navCarrito.classList.add('active');
            actualizarCarrito();
            break;
        case 'compra':
            seccionCompra.classList.remove('hidden');
            navComprar.classList.add('active');
            break;
        case 'confirmacion':
            seccionConfirmacion.classList.remove('hidden');
            break;
    }
}

// Función para renderizar el catálogo de juegos
function renderizarCatalogo() {
    const terminoBusqueda = buscador.value.toLowerCase();
    
    // Filtrar juegos según término de búsqueda
    const juegosFiltrados = catalogoJuegos.filter(juego => 
        juego.nombre.toLowerCase().includes(terminoBusqueda) || 
        juego.categoria.toLowerCase().includes(terminoBusqueda)
    );
    
    // Generar HTML para los juegos
    listaJuegos.innerHTML = '';
    
    juegosFiltrados.forEach(juego => {
        const juegoElement = document.createElement('div');
        juegoElement.className = 'game-card';
        
        // Determinar estado del stock
        let stockClass = 'in-stock';
        let stockText = `${juego.stock} disponibles`;
        
        if (juego.stock === 0) {
            stockClass = 'out-of-stock';
            stockText = 'Agotado';
        } else if (juego.stock <= 5) {
            stockClass = 'low-stock';
            stockText = `Solo ${juego.stock} disponibles`;
        }
        
        juegoElement.innerHTML = `
            <div class="game-image">
                <i class="fas fa-gamepad"></i>
            </div>
            <div class="game-content">
                <h3 class="game-title">${juego.nombre}</h3>
                <span class="game-category">${juego.categoria}</span>
                <div class="game-details">
                    <div class="game-price">$${juego.precio.toFixed(2)}</div>
                    <div class="game-stock ${stockClass}">${stockText}</div>
                </div>
                <button class="btn add-to-cart" data-id="${juego.id}" ${juego.stock === 0 ? 'disabled' : ''}>
                    <i class="fas fa-cart-plus"></i> 
                    ${juego.stock === 0 ? 'Agotado' : 'Agregar al Carrito'}
                </button>
            </div>
        `;
        
        listaJuegos.appendChild(juegoElement);
    });
    
    // Agregar event listeners a los botones de agregar al carrito
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            const juegoId = parseInt(btn.getAttribute('data-id'));
            agregarAlCarrito(juegoId);
        });
    });
}

// Función para agregar un juego al carrito
function agregarAlCarrito(juegoId) {
    const juego = catalogoJuegos.find(j => j.id === juegoId);
    
    if (!juego || juego.stock <= 0) {
        return;
    }
    
    // Verificar si el juego ya está en el carrito
    const itemExistente = carritoCompras.find(item => item.id === juegoId);
    
    if (itemExistente) {
        // Verificar stock disponible
        if (itemExistente.cantidad < juego.stock) {
            itemExistente.cantidad++;
            itemExistente.subtotal = itemExistente.precio * itemExistente.cantidad;
        } else {
            alert(`No hay suficiente stock de ${juego.nombre}. Solo quedan ${juego.stock} unidades.`);
            return;
        }
    } else {
        // Agregar nuevo juego al carrito
        carritoCompras.push({
            id: juego.id,
            nombre: juego.nombre,
            precio: juego.precio,
            categoria: juego.categoria,
            cantidad: 1,
            subtotal: juego.precio
        });
    }
    
    // Reducir stock en el catálogo
    juego.stock--;
    
    // Actualizar la interfaz
    actualizarInterfaz();
    guardarDatosLocalStorage();
    
    // Mostrar mensaje de éxito
    alert(`✅ ${juego.nombre} agregado al carrito!`);
}

// Función para actualizar la visualización del carrito
function actualizarCarrito() {
    // Actualizar contador del carrito
    const totalItems = carritoCompras.reduce((total, item) => total + item.cantidad, 0);
    cartCount.textContent = totalItems;
    
    // Verificar si el carrito está vacío
    if (carritoCompras.length === 0) {
        carritoVacio.classList.remove('hidden');
        carritoContenido.classList.add('hidden');
        return;
    }
    
    carritoVacio.classList.add('hidden');
    carritoContenido.classList.remove('hidden');
    
    // Calcular totales
    let subtotal = 0;
    let totalJuegos = 0;
    
    // Generar items del carrito
    itemsCarrito.innerHTML = '';
    
    carritoCompras.forEach((item, index) => {
        subtotal += item.subtotal;
        totalJuegos += item.cantidad;
        
        const itemElement = document.createElement('tr');
        itemElement.innerHTML = `
            <td>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div class="cart-item-img">
                        <i class="fas fa-gamepad"></i>
                    </div>
                    <div>
                        <div class="cart-item-name">${item.nombre}</div>
                        <div class="cart-item-category">${item.categoria}</div>
                    </div>
                </div>
            </td>
            <td>$${item.precio.toFixed(2)}</td>
            <td>
                <div class="cart-quantity">
                    <button class="quantity-btn" data-index="${index}" data-action="decrement">-</button>
                    <span>${item.cantidad}</span>
                    <button class="quantity-btn" data-index="${index}" data-action="increment">+</button>
                </div>
            </td>
            <td>$${item.subtotal.toFixed(2)}</td>
            <td>
                <button class="cart-remove" data-index="${index}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        itemsCarrito.appendChild(itemElement);
    });
    
    // Calcular descuentos
    const descuento = calcularDescuento(totalJuegos);
    const montoDescuento = subtotal * descuento;
    const totalConDescuento = subtotal - montoDescuento;
    const impuestos = totalConDescuento * IVA;
    const totalFinal = totalConDescuento + impuestos;
    
    // Actualizar resumen del carrito
    carritoSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    carritoDescuento.textContent = `-$${montoDescuento.toFixed(2)}`;
    carritoIva.textContent = `+$${impuestos.toFixed(2)}`;
    carritoTotal.textContent = `$${totalFinal.toFixed(2)}`;
    
    // Actualizar estado VIP
    if (clienteVIP) {
        vipDiscount.classList.remove('hidden');
    } else {
        vipDiscount.classList.add('hidden');
    }
    
    // Agregar event listeners a los botones de cantidad y eliminar
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.getAttribute('data-index'));
            const action = btn.getAttribute('data-action');
            actualizarCantidadItem(index, action);
        });
    });
    
    document.querySelectorAll('.cart-remove').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.getAttribute('data-index'));
            eliminarItemCarrito(index);
        });
    });
}

// Función para actualizar la cantidad de un item en el carrito
function actualizarCantidadItem(index, action) {
    const item = carritoCompras[index];
    const juego = catalogoJuegos.find(j => j.id === item.id);
    
    if (action === 'increment') {
        if (item.cantidad < juego.stock + item.cantidad) {
            item.cantidad++;
            juego.stock--;
        } else {
            alert(`No hay suficiente stock de ${item.nombre}. Solo quedan ${juego.stock} unidades disponibles.`);
            return;
        }
    } else if (action === 'decrement') {
        item.cantidad--;
        juego.stock++;
        
        if (item.cantidad <= 0) {
            carritoCompras.splice(index, 1);
        }
    }
    
    // Actualizar subtotal
    if (item.cantidad > 0) {
        item.subtotal = item.precio * item.cantidad;
    }
    
    // Actualizar interfaz
    actualizarInterfaz();
    guardarDatosLocalStorage();
}

// Función para eliminar un item del carrito
function eliminarItemCarrito(index) {
    const item = carritoCompras[index];
    const juego = catalogoJuegos.find(j => j.id === item.id);
    
    // Devolver stock al catálogo
    juego.stock += item.cantidad;
    
    // Eliminar del carrito
    carritoCompras.splice(index, 1);
    
    // Actualizar interfaz
    actualizarInterfaz();
    guardarDatosLocalStorage();
}

// Función para calcular el descuento aplicable
function calcularDescuento(totalJuegos) {
    // Cliente VIP tiene descuento especial
    if (clienteVIP) {
        return DESCUENTO_VIP;
    }
    
    // Descuentos por cantidad
    if (totalJuegos >= 5) {
        return DESCUENTO_5_JUEGOS;
    } else if (totalJuegos >= 3) {
        return DESCUENTO_3_JUEGOS;
    }
    
    return 0;
}

// Función para procesar la compra
function procesarCompra() {
    // Validar datos del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const ciudad = document.getElementById('ciudad').value.trim();
    const cp = document.getElementById('cp').value.trim();
    
    if (!nombre || !email || !direccion || !ciudad || !cp) {
        alert('Por favor completa todos los campos del formulario.');
        return;
    }
    
    if (!metodoPagoSeleccionado) {
        alert('Por favor selecciona un método de pago.');
        return;
    }
    
    // Validar datos de tarjeta si es necesario
    if (metodoPagoSeleccionado === 'credito' || metodoPagoSeleccionado === 'debito') {
        const numero = document.getElementById('tarjeta-numero').value.trim();
        const nombreTarjeta = document.getElementById('tarjeta-nombre').value.trim();
        const vencimiento = document.getElementById('tarjeta-vencimiento').value.trim();
        const cvv = document.getElementById('tarjeta-cvv').value.trim();
        
        if (!numero || !nombreTarjeta || !vencimiento || !cvv) {
            alert('Por favor completa todos los campos de la tarjeta.');
            return;
        }
    }
    
    // Simular procesamiento de pago (95% de éxito)
    const pagoExitoso = Math.random() > 0.05;
    
    if (!pagoExitoso) {
        alert('❌ Hubo un problema con el pago. Por favor intenta nuevamente.');
        return;
    }
    
    // Calcular totales
    let subtotal = carritoCompras.reduce((total, item) => total + item.subtotal, 0);
    let totalJuegos = carritoCompras.reduce((total, item) => total + item.cantidad, 0);
    const descuento = calcularDescuento(totalJuegos);
    const montoDescuento = subtotal * descuento;
    const totalConDescuento = subtotal - montoDescuento;
    const impuestos = totalConDescuento * IVA;
    const totalFinal = totalConDescuento + impuestos;
    
    // Generar número de orden
    const numeroOrden = 'GS-' + Math.floor(100000 + Math.random() * 900000);
    
    // Calcular fecha de entrega (3 días a partir de hoy)
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + 3);
    const fechaFormateada = fecha.toLocaleDateString('es-AR');
    
    // Actualizar datos de confirmación
    ordenNumero.textContent = numeroOrden;
    fechaEntrega.textContent = fechaFormateada;
    metodoPago.textContent = metodoPagoSeleccionado === 'credito' ? 'Tarjeta de Crédito' :
                             metodoPagoSeleccionado === 'debito' ? 'Tarjeta de Débito' :
                             metodoPagoSeleccionado === 'paypal' ? 'PayPal' : 'Efectivo';
    totalPagado.textContent = `$${totalFinal.toFixed(2)}`;
    direccionEnvio.textContent = `${direccion}, ${ciudad} (${cp})`;
    
    // Limpiar carrito
    carritoCompras = [];
    
    // Guardar datos
    guardarDatosLocalStorage();
    
    // Mostrar confirmación
    mostrarSeccion('confirmacion');
}

// Función para actualizar toda la interfaz
function actualizarInterfaz() {
    // Actualizar contador del carrito
    const totalItems = carritoCompras.reduce((total, item) => total + item.cantidad, 0);
    cartCount.textContent = totalItems;
    
    // Actualizar estado VIP
    if (clienteVIP) {
        vipStatus.classList.remove('hidden');
    } else {
        vipStatus.classList.add('hidden');
    }
    
    // Actualizar carrito si está visible
    if (!seccionCarrito.classList.contains('hidden')) {
        actualizarCarrito();
    }
    
    // Actualizar catálogo si está visible
    if (!seccionCatalogo.classList.contains('hidden')) {
        renderizarCatalogo();
    }
}

// ==================== LOCALSTORAGE ====================
// Guardar datos en localStorage
function guardarDatosLocalStorage() {
    localStorage.setItem('carritoCompras', JSON.stringify(carritoCompras));
    localStorage.setItem('clienteVIP', JSON.stringify(clienteVIP));
    localStorage.setItem('catalogoJuegos', JSON.stringify(catalogoJuegos));
}

// Cargar datos desde localStorage
function cargarDatosLocalStorage() {
    const carritoGuardado = localStorage.getItem('carritoCompras');
    const vipGuardado = localStorage.getItem('clienteVIP');
    const catalogoGuardado = localStorage.getItem('catalogoJuegos');
    
    if (carritoGuardado) {
        carritoCompras = JSON.parse(carritoGuardado);
    }
    
    if (vipGuardado) {
        clienteVIP = JSON.parse(vipGuardado);
    }
    
    if (catalogoGuardado) {
        const catalogoCargado = JSON.parse(catalogoGuardado);
        
        // Actualizar catálogo manteniendo la estructura original
        catalogoCargado.forEach(juegoCargado => {
            const juegoOriginal = catalogoJuegos.find(j => j.id === juegoCargado.id);
            if (juegoOriginal) {
                juegoOriginal.stock = juegoCargado.stock;
            }
        });
    }
}

// ==================== EVENT LISTENERS ====================
function registrarEventListeners() {
    // Navegación
    navInicio.addEventListener('click', () => mostrarSeccion('bienvenida'));
    navCatalogo.addEventListener('click', () => mostrarSeccion('catalogo'));
    navCarrito.addEventListener('click', () => mostrarSeccion('carrito'));
    navComprar.addEventListener('click', () => {
        if (carritoCompras.length > 0) {
            mostrarSeccion('compra');
        } else {
            alert('Tu carrito está vacío. Agrega productos antes de comprar.');
        }
    });
    
    // Botón menú móvil
    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });
    
    // Botones principales
    btnComenzar.addEventListener('click', () => {
        // Preguntar si es cliente VIP
        clienteVIP = confirm('¿Sos cliente VIP? Tenés descuentos especiales!');
        mostrarSeccion('catalogo');
    });
    
    cartIcon.addEventListener('click', () => {
        mostrarSeccion('carrito');
        mainNav.classList.remove('active');
    });
    
    btnSeguirComprando.addEventListener('click', () => {
        mostrarSeccion('catalogo');
        mainNav.classList.remove('active');
    });
    
    btnProcesarCompra.addEventListener('click', () => {
        if (carritoCompras.length > 0) {
            mostrarSeccion('compra');
            mainNav.classList.remove('active');
        }
    });
    
    btnConfirmarCompra.addEventListener('click', procesarCompra);
    
    btnVolverInicio.addEventListener('click', () => {
        // Resetear formulario
        document.getElementById('nombre').value = '';
        document.getElementById('email').value = '';
        document.getElementById('direccion').value = '';
        document.getElementById('ciudad').value = '';
        document.getElementById('cp').value = '';
        
        // Resetear método de pago
        metodoPagoSeleccionado = null;
        document.querySelectorAll('.payment-method').forEach(el => el.classList.remove('selected'));
        tarjetaDetalles.classList.add('hidden');
        
        mostrarSeccion('bienvenida');
        mainNav.classList.remove('active');
    });
    
    // Buscador
    buscador.addEventListener('input', renderizarCatalogo);
    
    // Métodos de pago
    metodoPagoElements.forEach(element => {
        element.addEventListener('click', () => {
            // Remover selección anterior
            metodoPagoElements.forEach(el => el.classList.remove('selected'));
            
            // Seleccionar nuevo método
            element.classList.add('selected');
            metodoPagoSeleccionado = element.getAttribute('data-method');
            
            // Mostrar detalles de tarjeta si es necesario
            if (metodoPagoSeleccionado === 'credito' || metodoPagoSeleccionado === 'debito') {
                tarjetaDetalles.classList.remove('hidden');
            } else {
                tarjetaDetalles.classList.add('hidden');
            }
        });
    });
}

// ==================== INICIALIZACIÓN ====================
// Iniciar la aplicación cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', iniciarSimulador);