// // Constantes del sistema
// const DESCUENTO_3_JUEGOS = 0.1 // 10% descuento por 3 juegos
// const DESCUENTO_5_JUEGOS = 0.15 // 15% descuento por 5 juegos
// const DESCUENTO_VIP = 0.2 // 20% descuento VIP
// const IVA = 0.21 // 21% IVA

// // Variables globales
// let carritoCompras = []
// const totalCompra = 0
// let clienteVIP = false

// // Array con el catálogo de videojuegos
// const catalogoJuegos = [
//   { id: 1, nombre: "The Legend of Zelda: Breath of the Wild", precio: 59.99, categoria: "Aventura", stock: 15 },
//   { id: 2, nombre: "Super Mario Odyssey", precio: 49.99, categoria: "Plataformas", stock: 20 },
//   { id: 3, nombre: "Call of Duty: Modern Warfare", precio: 69.99, categoria: "Acción", stock: 12 },
//   { id: 4, nombre: "FIFA 24", precio: 59.99, categoria: "Deportes", stock: 25 },
//   { id: 5, nombre: "Minecraft", precio: 29.99, categoria: "Sandbox", stock: 30 },
//   { id: 6, nombre: "Grand Theft Auto V", precio: 39.99, categoria: "Acción", stock: 18 },
//   { id: 7, nombre: "Fortnite Battle Pass", precio: 9.99, categoria: "Battle Royale", stock: 100 },
//   { id: 8, nombre: "Cyberpunk 2077", precio: 49.99, categoria: "RPG", stock: 8 },
// ]

// // ==================== FUNCIONES PRINCIPALES ====================

// /**
//  * Función principal que inicia el simulador
//  */
// function iniciarSimulador() {
//   console.clear()
//   console.log("🎮 ¡BIENVENIDO A LA TIENDA DE VIDEOJUEGOS, CHE! 🎮")
//   console.log("=".repeat(50))

//   // Solicitar datos del cliente
//   const datosCliente = solicitarDatosCliente()

//   if (datosCliente) {
//     mostrarBienvenida(datosCliente.nombre, datosCliente.esVIP)
//     mostrarMenu()
//   } else {
//     alert("❌ Simulador cancelado. ¡Vuelve pronto!")
//   }
// }

// /**
//  * Función para solicitar y validar datos del cliente
//  * @returns {Object|null} Objeto con datos del cliente o null si se cancela
//  */
// function solicitarDatosCliente() {
//   console.log("📋 Solicitando datos del cliente...")

//   // Solicitar nombre del cliente
//   let nombreCliente = prompt("👤 Decime tu nombre para empezar, dale:")

//   if (!nombreCliente) {
//     return null // Usuario canceló
//   }

//   // Validar que el nombre no esté vacío
//   while (nombreCliente.trim() === "") {
//     nombreCliente = prompt("⚠️ Eh, no podés dejar el nombre vacío.\nDecime tu nombre, dale:")
//     if (!nombreCliente) return null
//   }

//   // Preguntar si es cliente VIP
//   const esVIP = confirm(`¡Hola ${nombreCliente}! 🌟\n¿Sos cliente VIP de nuestro local?`)
//   clienteVIP = esVIP

//   console.log(`✅ Cliente registrado: ${nombreCliente} ${esVIP ? "(VIP)" : "(Regular)"}`)

//   return {
//     nombre: nombreCliente,
//     esVIP: esVIP,
//   }
// }

// /**
//  * Función para mostrar mensaje de bienvenida personalizado
//  * @param {string} nombre - Nombre del cliente
//  * @param {boolean} esVIP - Si el cliente es VIP
//  */
// function mostrarBienvenida(nombre, esVIP) {
//   let mensajeBienvenida = `🎉 ¡Bienvenido/a ${nombre}!\n\n`

//   if (esVIP) {
//     mensajeBienvenida += `⭐ Como cliente VIP tenés un descuento especial del ${DESCUENTO_VIP * 100}% en toda tu compra, bárbaro.\n\n`
//   } else {
//     mensajeBienvenida += `💡 Che, comprando 3 o más juegos te llevás descuentos especiales:\n`
//     mensajeBienvenida += `   • 3-4 juegos: ${DESCUENTO_3_JUEGOS * 100}% de descuento\n`
//     mensajeBienvenida += `   • 5+ juegos: ${DESCUENTO_5_JUEGOS * 100}% de descuento\n\n`
//   }

//   mensajeBienvenida += `🛒 ¡Dale que empezamos con tu compra!`

//   alert(mensajeBienvenida)
//   console.log("🎯 Cliente configurado correctamente")
// }

// /**
//  * Función para mostrar el menú principal y gestionar opciones
//  */
// function mostrarMenu() {
//   let continuar = true

//   while (continuar) {
//     console.log("\n" + "=".repeat(40))
//     console.log("📱 MENÚ PRINCIPAL")
//     console.log("=".repeat(40))

//     const opcion = prompt(
//       "🎮 TIENDA DE VIDEOJUEGOS - MENÚ PRINCIPAL\n\n" +
//         "Elegí una opción:\n\n" +
//         "1️⃣ Ver catálogo completo\n" +
//         "2️⃣ Buscar juego por categoría\n" +
//         "3️⃣ Agregar juego al carrito\n" +
//         "4️⃣ Ver carrito de compras\n" +
//         "5️⃣ Procesar compra\n" +
//         "6️⃣ Salir\n\n" +
//         "Metele el número de tu opción:",
//     )

//     if (!opcion) {
//       continuar = false
//       continue
//     }

//     // Procesar opción seleccionada
//     switch (opcion) {
//       case "1":
//         mostrarCatalogo()
//         break
//       case "2":
//         buscarPorCategoria()
//         break
//       case "3":
//         agregarJuegoAlCarrito()
//         break
//       case "4":
//         mostrarCarrito()
//         break
//       case "5":
//         procesarCompra()
//         break
//       case "6":
//         continuar = confirmarSalida()
//         break
//       default:
//         alert("❌ Esa opción no va, che. Elegí un número del 1 al 6.")
//         console.log("⚠️ Opción inválida seleccionada:", opcion)
//     }
//   }
// }

// /**
//  * Función para mostrar el catálogo completo de juegos
//  */
// function mostrarCatalogo() {
//   console.log("\n🎮 CATÁLOGO COMPLETO DE VIDEOJUEGOS")
//   console.log("=".repeat(60))

//   let catalogoTexto = "🎮 CATÁLOGO DE VIDEOJUEGOS\n\n"

//   // Usar ciclo for para recorrer el catálogo
//   for (let i = 0; i < catalogoJuegos.length; i++) {
//     const juego = catalogoJuegos[i]

//     console.log(`${juego.id}. ${juego.nombre}`)
//     console.log(`   💰 Precio: $${juego.precio}`)
//     console.log(`   🏷️ Categoría: ${juego.categoria}`)
//     console.log(`   📦 Stock: ${juego.stock} unidades`)
//     console.log("-".repeat(40))

//     catalogoTexto += `${juego.id}. ${juego.nombre}\n`
//     catalogoTexto += `   💰 $${juego.precio} | 🏷️ ${juego.categoria} | 📦 Stock: ${juego.stock}\n\n`
//   }

//   alert(catalogoTexto + "✨ ¡Elegí tus juegos favoritos!")
// }

// /**
//  * Función para buscar juegos por categoría
//  */
// function buscarPorCategoria() {
//   console.log("\n🔍 BÚSQUEDA POR CATEGORÍA")

//   // Obtener categorías únicas
//   const categorias = [...new Set(catalogoJuegos.map((juego) => juego.categoria))]

//   let mensajeCategorias = "🔍 BUSCAR POR CATEGORÍA\n\nCategorías que tenemos:\n\n"

//   // Mostrar categorías disponibles
//   for (let i = 0; i < categorias.length; i++) {
//     mensajeCategorias += `${i + 1}. ${categorias[i]}\n`
//     console.log(`${i + 1}. ${categorias[i]}`)
//   }

//   const seleccion = prompt(mensajeCategorias + "\nMetele el número de la categoría:")

//   if (!seleccion || seleccion < 1 || seleccion > categorias.length) {
//     alert("❌ Esa selección no va, che.")
//     return
//   }

//   const categoriaSeleccionada = categorias[seleccion - 1]
//   const juegosFiltrados = catalogoJuegos.filter((juego) => juego.categoria === categoriaSeleccionada)

//   console.log(`\n🎯 Juegos de la categoría: ${categoriaSeleccionada}`)
//   console.log("=".repeat(50))

//   let resultados = `🎯 JUEGOS DE ${categoriaSeleccionada.toUpperCase()}\n\n`

//   // Mostrar juegos filtrados
//   for (let i = 0; i < juegosFiltrados.length; i++) {
//     const juego = juegosFiltrados[i]
//     console.log(`${juego.id}. ${juego.nombre} - $${juego.precio}`)
//     resultados += `${juego.id}. ${juego.nombre} - $${juego.precio}\n`
//   }

//   alert(resultados)
// }

// /**
//  * Función para agregar un juego al carrito
//  */
// function agregarJuegoAlCarrito() {
//   console.log("\n🛒 AGREGAR JUEGO AL CARRITO")

//   // Mostrar catálogo resumido para facilitar la selección
//   let catalogoResumido = "🎮 JUEGOS DISPONIBLES:\n\n"

//   for (let i = 0; i < catalogoJuegos.length; i++) {
//     const juego = catalogoJuegos[i]
//     if (juego.stock > 0) {
//       catalogoResumido += `${juego.id}. ${juego.nombre} - $${juego.precio} (Stock: ${juego.stock})\n`
//     }
//   }

//   catalogoResumido += "\n¿Cuál querés agregar al carrito?"

//   const idJuego = prompt(catalogoResumido + "\n\nDecime el ID del juego:")

//   if (!idJuego) return

//   // Buscar el juego por ID
//   const juegoEncontrado = catalogoJuegos.find((juego) => juego.id == idJuego)

//   if (!juegoEncontrado) {
//     alert("❌ Ese juego no lo encontré. Fijate bien el ID.")
//     console.log("⚠️ ID de juego no válido:", idJuego)
//     return
//   }

//   // Verificar stock
//   if (juegoEncontrado.stock <= 0) {
//     alert(`❌ Una lástima, ${juegoEncontrado.nombre} está agotado.`)
//     console.log("📦 Juego sin stock:", juegoEncontrado.nombre)
//     return
//   }

//   // Preguntar cantidad
//   let cantidad = prompt(
//     `🔢 ¿Cuántas copias de "${juegoEncontrado.nombre}" querés llevarte?\n\n📦 Stock que tenemos: ${juegoEncontrado.stock}\n💰 Precio por unidad: $${juegoEncontrado.precio}`,
//   )

//   if (!cantidad) return

//   cantidad = Number.parseInt(cantidad)

//   if (isNaN(cantidad) || cantidad <= 0) {
//     alert("❌ Esa cantidad no va, che. Tiene que ser un número mayor a 0.")
//     return
//   }

//   if (cantidad > juegoEncontrado.stock) {
//     alert(`❌ No tenemos tanto stock, loco. Solo nos quedan ${juegoEncontrado.stock} unidades.`)
//     return
//   }

//   // Verificar si ya está en el carrito
//   const juegoEnCarrito = carritoCompras.find((item) => item.id === juegoEncontrado.id)

//   if (juegoEnCarrito) {
//     // Si ya está, agregar a la cantidad existente
//     const nuevaCantidad = juegoEnCarrito.cantidad + cantidad
//     if (nuevaCantidad > juegoEncontrado.stock + juegoEnCarrito.cantidad) {
//       alert(
//         `❌ No podés agregar ${cantidad} más. Ya tenés ${juegoEnCarrito.cantidad} en el carrito y solo tenemos ${juegoEncontrado.stock + juegoEnCarrito.cantidad} disponibles.`,
//       )
//       return
//     }
//     juegoEnCarrito.cantidad = nuevaCantidad
//     juegoEnCarrito.subtotal = juegoEnCarrito.precio * juegoEnCarrito.cantidad
//   } else {
//     // Agregar nuevo juego al carrito
//     carritoCompras.push({
//       id: juegoEncontrado.id,
//       nombre: juegoEncontrado.nombre,
//       precio: juegoEncontrado.precio,
//       categoria: juegoEncontrado.categoria,
//       cantidad: cantidad,
//       subtotal: juegoEncontrado.precio * cantidad,
//     })
//   }

//   // Reducir stock
//   juegoEncontrado.stock -= cantidad

//   console.log(`✅ ${cantidad}x ${juegoEncontrado.nombre} agregado al carrito`)

//   // Mensaje personalizado según el juego
//   let mensajePersonalizado = `✅ ¡Bárbaro! ${cantidad}x ${juegoEncontrado.nombre} agregado al carrito!\n💰 Subtotal: $${(juegoEncontrado.precio * cantidad).toFixed(2)}\n\n`

//   // Agregar comentarios especiales según el juego
//   if (juegoEncontrado.nombre.includes("FIFA") || juegoEncontrado.nombre.includes("Call of Duty")) {
//     mensajePersonalizado += "🔥 ¡Te estás llevando uno de los más buscados!\n"
//   } else if (juegoEncontrado.nombre.includes("Zelda") || juegoEncontrado.nombre.includes("Mario")) {
//     mensajePersonalizado += "🌟 ¡Excelente elección! Un clásico que nunca falla.\n"
//   } else if (juegoEncontrado.nombre.includes("Minecraft")) {
//     mensajePersonalizado += "⛏️ ¡Perfecto para crear mundos increíbles!\n"
//   } else if (juegoEncontrado.nombre.includes("Cyberpunk")) {
//     mensajePersonalizado += "🤖 ¡Te va a volar la cabeza este juego!\n"
//   }

//   // Calcular total de juegos en carrito
//   let totalJuegos = 0
//   for (let i = 0; i < carritoCompras.length; i++) {
//     totalJuegos += carritoCompras[i].cantidad
//   }

//   // Sugerencia de finalizar compra si tiene varios juegos
//   if (totalJuegos >= 3) {
//     mensajePersonalizado += `\n🎯 Ya tenés ${totalJuegos} juegos en el carrito.\n¿Querés que finalicemos tu compra para asegurártelos?`

//     const finalizarAhora = confirm(mensajePersonalizado)

//     if (finalizarAhora) {
//       procesarCompra()
//       return
//     }
//   } else {
//     alert(mensajePersonalizado)
//   }
// }

// /**
//  * Función para mostrar el contenido del carrito
//  */
// function mostrarCarrito() {
//   console.log("\n🛒 CARRITO DE COMPRAS")
//   console.log("=".repeat(50))

//   if (carritoCompras.length === 0) {
//     alert("🛒 Tu carrito está vacío, che.\n¡Agregá algunos juegos copados!")
//     console.log("📭 Carrito vacío")
//     return
//   }

//   let carritoTexto = "🛒 TU CARRITO DE COMPRAS\n\n"
//   let subtotal = 0
//   let totalJuegos = 0

//   // Mostrar cada juego en el carrito
//   for (let i = 0; i < carritoCompras.length; i++) {
//     const juego = carritoCompras[i]
//     console.log(`${i + 1}. ${juego.nombre} x${juego.cantidad} - $${juego.subtotal.toFixed(2)}`)
//     carritoTexto += `${i + 1}. ${juego.nombre}\n   Cantidad: ${juego.cantidad} x $${juego.precio} = $${juego.subtotal.toFixed(2)}\n\n`
//     subtotal += juego.subtotal
//     totalJuegos += juego.cantidad
//   }

//   // Calcular descuentos
//   const descuento = calcularDescuento(totalJuegos)
//   const montoDescuento = subtotal * descuento
//   const totalConDescuento = subtotal - montoDescuento
//   const impuestos = totalConDescuento * IVA
//   const totalFinal = totalConDescuento + impuestos

//   carritoTexto += `💰 RESUMEN:\n`
//   carritoTexto += `Subtotal (${totalJuegos} juegos): $${subtotal.toFixed(2)}\n`

//   if (descuento > 0) {
//     carritoTexto += `Descuento (${(descuento * 100).toFixed(0)}%): -$${montoDescuento.toFixed(2)}\n`
//   }

//   carritoTexto += `IVA (${(IVA * 100).toFixed(0)}%): +$${impuestos.toFixed(2)}\n`
//   carritoTexto += `TOTAL: $${totalFinal.toFixed(2)}`

//   console.log(`\n💰 Subtotal: $${subtotal.toFixed(2)}`)
//   console.log(`🎁 Descuento: $${montoDescuento.toFixed(2)}`)
//   console.log(`💸 Total: $${totalFinal.toFixed(2)}`)

//   alert(carritoTexto)
// }

// /**
//  * Función para calcular el descuento aplicable
//  * @param {number} cantidadJuegos - Cantidad de juegos en el carrito
//  * @returns {number} Porcentaje de descuento (0.0 a 1.0)
//  */
// function calcularDescuento(totalJuegos) {
//   console.log(`🧮 Calculando descuento para ${totalJuegos} juegos`)

//   // Cliente VIP tiene descuento especial
//   if (clienteVIP) {
//     console.log(`⭐ Aplicando descuento VIP: ${DESCUENTO_VIP * 100}%`)
//     return DESCUENTO_VIP
//   }

//   // Descuentos por cantidad
//   if (totalJuegos >= 5) {
//     console.log(`🎉 Descuento por 5+ juegos: ${DESCUENTO_5_JUEGOS * 100}%`)
//     return DESCUENTO_5_JUEGOS
//   } else if (totalJuegos >= 3) {
//     console.log(`🎁 Descuento por 3+ juegos: ${DESCUENTO_3_JUEGOS * 100}%`)
//     return DESCUENTO_3_JUEGOS
//   }

//   console.log("💡 Sin descuento aplicable")
//   return 0
// }

// /**
//  * Función para procesar la compra final
//  */
// function procesarCompra() {
//   console.log("\n💳 PROCESANDO COMPRA")
//   console.log("=".repeat(40))

//   if (carritoCompras.length === 0) {
//     alert("🛒 No podés procesar una compra con el carrito vacío, loco.\n¡Agregá algunos juegos primero!")
//     return
//   }

//   // Calcular totales
//   let subtotal = 0
//   let totalJuegos = 0
//   for (let i = 0; i < carritoCompras.length; i++) {
//     subtotal += carritoCompras[i].subtotal
//     totalJuegos += carritoCompras[i].cantidad
//   }

//   const descuento = calcularDescuento(totalJuegos)
//   const montoDescuento = subtotal * descuento
//   const totalConDescuento = subtotal - montoDescuento
//   const impuestos = totalConDescuento * IVA
//   const totalFinal = totalConDescuento + impuestos

//   // PASO 1: Mostrar resumen y confirmar
//   let resumenCompra = "🧾 RESUMEN DE TU COMPRA\n\n"
//   resumenCompra += `📦 Productos (${totalJuegos} juegos):\n`

//   for (let i = 0; i < carritoCompras.length; i++) {
//     const juego = carritoCompras[i]
//     resumenCompra += `• ${juego.nombre} x${juego.cantidad} = $${juego.subtotal.toFixed(2)}\n`
//   }

//   resumenCompra += `\n💰 TOTALES:\n`
//   resumenCompra += `Subtotal: $${subtotal.toFixed(2)}\n`

//   if (descuento > 0) {
//     resumenCompra += `Descuento: -$${montoDescuento.toFixed(2)}\n`
//   }

//   resumenCompra += `IVA: +$${impuestos.toFixed(2)}\n`
//   resumenCompra += `TOTAL A PAGAR: $${totalFinal.toFixed(2)}\n\n`
//   resumenCompra += `¿Seguimos con la compra?`

//   const continuarCompra = confirm(resumenCompra)

//   if (!continuarCompra) {
//     alert("❌ Compra cancelada. Tu carrito queda como está.")
//     console.log("❌ Compra cancelada por el usuario")
//     return
//   }

//   // PASO 2: Solicitar datos de envío
//   const datosEnvio = solicitarDatosEnvio()
//   if (!datosEnvio) {
//     alert("❌ Compra cancelada. Necesitamos los datos de envío.")
//     return
//   }

//   // PASO 3: Seleccionar método de pago
//   const metodoPago = seleccionarMetodoPago()
//   if (!metodoPago) {
//     alert("❌ Compra cancelada. Necesitamos que elijas cómo pagás.")
//     return
//   }

//   // PASO 4: Procesar pago
//   const pagoExitoso = procesarPago(metodoPago, totalFinal)
//   if (!pagoExitoso) {
//     alert("❌ Hubo un problema con el pago, che. Probá de nuevo.")
//     return
//   }

//   // PASO 5: Confirmar compra exitosa
//   const numeroOrden = Math.floor(Math.random() * 1000000)
//   const fechaEntrega = new Date()
//   fechaEntrega.setDate(fechaEntrega.getDate() + 3) // 3 días para entrega

//   const confirmacionFinal =
//     `✅ ¡COMPRA EXITOSA, CRACK!\n\n` +
//     `🎉 ¡Gracias por tu compra, che!\n\n` +
//     `📋 Número de orden: #${numeroOrden}\n` +
//     `💰 Total que pagaste: $${totalFinal.toFixed(2)}\n` +
//     `💳 Forma de pago: ${metodoPago.tipo}\n` +
//     `📍 Lo mandamos a: ${datosEnvio.direccion}, ${datosEnvio.ciudad}\n` +
//     `📅 Te llega el: ${fechaEntrega.toLocaleDateString()}\n\n` +
//     `📧 Te va a llegar un mail de confirmación a: ${datosEnvio.email}\n\n` +
//     `🎮 ¡Que los disfrutes, loco!`

//   alert(confirmacionFinal)

//   console.log(`✅ Compra procesada exitosamente`)
//   console.log(`📋 Orden #${numeroOrden}`)
//   console.log(`💰 Total: $${totalFinal.toFixed(2)}`)
//   console.log(`📍 Envío: ${datosEnvio.direccion}, ${datosEnvio.ciudad}`)

//   // Limpiar carrito
//   carritoCompras = []
//   console.log("🧹 Carrito limpiado")
// }

// /**
//  * Función para confirmar la salida del simulador
//  * @returns {boolean} 
//  */
// function confirmarSalida() {
//   const confirmar = confirm("🚪 ¿Seguro que te querés ir?\n\nSe va a borrar todo lo que tenés en el carrito.")

//   if (confirmar) {
//     alert("👋 ¡Gracias por venir a nuestro local!\n🎮 ¡Volvé pronto por más juegos copados!")
//     console.log("👋 Usuario salió del simulador")
//     return false 
//   }

//   return true 
// }

// // ==================== FUNCIONES DE UTILIDAD ====================

// /**
//  * Función para mostrar estadísticas del simulador (para debugging)
//  */
// function mostrarEstadisticas() {
//   console.log("\n📊 ESTADÍSTICAS DEL SIMULADOR")
//   console.log("=".repeat(40))
//   console.log(`🛒 Juegos en carrito: ${carritoCompras.length}`)
//   console.log(`👤 Cliente VIP: ${clienteVIP ? "Sí" : "No"}`)
//   console.log(`📦 Total juegos en catálogo: ${catalogoJuegos.length}`)

//   // Calcular stock total
//   let stockTotal = 0
//   for (let i = 0; i < catalogoJuegos.length; i++) {
//     stockTotal += catalogoJuegos[i].stock
//   }
//   console.log(`📊 Stock total disponible: ${stockTotal} unidades`)
// }

// // ==================== INICIALIZACIÓN ====================

// // Mensaje de bienvenida en consola al cargar la página
// console.log("🎮 Simulador de Tienda de Videojuegos cargado correctamente")
// console.log("💡 Haz clic en 'Iniciar Simulador' para comenzar")
// console.log("🔧 Escribe mostrarEstadisticas() en la consola para ver estadísticas")

// // Hacer la función de estadísticas disponible globalmente
// window.mostrarEstadisticas = mostrarEstadisticas

// /**
//  * Función para solicitar datos de envío
//  * @returns {Object|null} Datos de envío o null si se cancela
//  */
// function solicitarDatosEnvio() {
//   console.log("📍 Solicitando datos de envío...")

//   const nombre = prompt("👤 Nombre completo para el envío:")
//   if (!nombre || nombre.trim() === "") return null

//   const email = prompt("📧 Mail para las confirmaciones:")
//   if (!email || email.trim() === "") return null

//   const telefono = prompt("📱 Teléfono para contactarte:")
//   if (!telefono || telefono.trim() === "") return null

//   const direccion = prompt("🏠 Dirección completa:")
//   if (!direccion || direccion.trim() === "") return null

//   const ciudad = prompt("🏙️ Ciudad:")
//   if (!ciudad || ciudad.trim() === "") return null

//   const codigoPostal = prompt("📮 Código postal:")
//   if (!codigoPostal || codigoPostal.trim() === "") return null

//   console.log("✅ Datos de envío recopilados")

//   return {
//     nombre: nombre.trim(),
//     email: email.trim(),
//     telefono: telefono.trim(),
//     direccion: direccion.trim(),
//     ciudad: ciudad.trim(),
//     codigoPostal: codigoPostal.trim(),
//   }
// }

// /**
//  * Función para seleccionar método de pago
//  * @returns {Object|null} Método de pago seleccionado o null si se cancela
//  */
// function seleccionarMetodoPago() {
//   console.log("💳 Seleccionando método de pago...")

//   const metodo = prompt(
//     "💳 ELEGÍ CÓMO QUERÉS PAGAR:\n\n" +
//       "1️⃣ Tarjeta de Crédito\n" +
//       "2️⃣ Tarjeta de Débito\n" +
//       "3️⃣ PayPal\n" +
//       "4️⃣ Transferencia Bancaria\n" +
//       "5️⃣ Efectivo (Pagás cuando te llega)\n\n" +
//       "Metele el número de tu opción:",
//   )

//   if (!metodo) return null

//   let metodoPago = {}

//   switch (metodo) {
//     case "1":
//       metodoPago = { tipo: "Tarjeta de Crédito", icono: "💳" }
//       break
//     case "2":
//       metodoPago = { tipo: "Tarjeta de Débito", icono: "💳" }
//       break
//     case "3":
//       metodoPago = { tipo: "PayPal", icono: "🅿️" }
//       break
//     case "4":
//       metodoPago = { tipo: "Transferencia Bancaria", icono: "🏦" }
//       break
//     case "5":
//       metodoPago = { tipo: "Efectivo (Contra entrega)", icono: "💵" }
//       break
//     default:
//       alert("❌ Esa forma de pago no la tenemos, che.")
//       return null
//   }

//   // Si es tarjeta, solicitar datos adicionales
//   if (metodo === "1" || metodo === "2") {
//     const numeroTarjeta = prompt("💳 Últimos 4 números de la tarjeta (es solo simulación):")
//     if (!numeroTarjeta) return null
//     metodoPago.ultimosDigitos = numeroTarjeta
//   }

//   console.log(`✅ Método de pago seleccionado: ${metodoPago.tipo}`)
//   return metodoPago
// }

// /**
//  * Función para simular el procesamiento del pago
//  * @param {Object} metodoPago - Método de pago seleccionado
//  * @param {number} total - Total a pagar
//  * @returns {boolean} true si el pago fue exitoso
//  */
// function procesarPago(metodoPago, total) {
//   console.log(`💳 Procesando pago de $${total.toFixed(2)} con ${metodoPago.tipo}...`)

//   // Simular tiempo de procesamiento
//   alert(
//     `⏳ Procesando el pago...\n\n${metodoPago.icono} ${metodoPago.tipo}\n💰 $${total.toFixed(2)}\n\nEsperá un toque...`,
//   )

//   // Simular éxito/fallo del pago (95% de éxito)
//   const pagoExitoso = Math.random() > 0.05

//   if (pagoExitoso) {
//     console.log("✅ Pago procesado exitosamente")
//     return true
//   } else {
//     console.log("❌ Error en el procesamiento del pago")
//     return false
//   }
// }

// js/simulador.js

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

// Footer links
const footerInicio = document.getElementById('footer-inicio');
const footerCatalogo = document.getElementById('footer-catalogo');
const footerCarrito = document.getElementById('footer-carrito');
const footerComprar = document.getElementById('footer-comprar');

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
    // Navegación principal
    navInicio.addEventListener('click', (e) => {
        e.preventDefault();
        mostrarSeccion('bienvenida');
        mainNav.classList.remove('active');
    });

    navCatalogo.addEventListener('click', (e) => {
        e.preventDefault();
        mostrarSeccion('catalogo');
        mainNav.classList.remove('active');
    });

    navCarrito.addEventListener('click', (e) => {
        e.preventDefault();
        mostrarSeccion('carrito');
        mainNav.classList.remove('active');
    });

    navComprar.addEventListener('click', (e) => {
        e.preventDefault();
        if (carritoCompras.length > 0) {
            mostrarSeccion('compra');
        } else {
            alert('Tu carrito está vacío. Agrega productos antes de comprar.');
        }
        mainNav.classList.remove('active');
    });
    
    // Enlaces del footer
    footerInicio.addEventListener('click', (e) => {
        e.preventDefault();
        mostrarSeccion('bienvenida');
        mainNav.classList.remove('active');
    });

    footerCatalogo.addEventListener('click', (e) => {
        e.preventDefault();
        mostrarSeccion('catalogo');
        mainNav.classList.remove('active');
    });

    footerCarrito.addEventListener('click', (e) => {
        e.preventDefault();
        mostrarSeccion('carrito');
        mainNav.classList.remove('active');
    });

    footerComprar.addEventListener('click', (e) => {
        e.preventDefault();
        if (carritoCompras.length > 0) {
            mostrarSeccion('compra');
        } else {
            alert('Tu carrito está vacío. Agrega productos antes de comprar.');
        }
        mainNav.classList.remove('active');
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