document.addEventListener('DOMContentLoaded', () => {

    //Declaracion de variables

    const contenedor = document.querySelector('.contenedor');
    const checkout = document.getElementById('checkout');
    const iconoCarrito = document.getElementById('icono-carrito');
    const cartItems = document.getElementById('cart-items');
    const total = document.getElementById('total');
    const finalizarCompraBtn = document.getElementById('finalizar-compra');
    const cerrarCarritoBtn = document.getElementById('cerrar-carrito');
    const anadirProductosBtn = document.getElementById('anadir-productos');

    // Llamado del archivo JSON para agregar productos

    fetch('./data/productos.json')
        .then(response => response.json())
        .then(productos => {
            productos.forEach(producto => {
                const tarjeta = document.createElement('div');
                tarjeta.classList.add('tarjetaArticulos', 'card');
                tarjeta.style.width = "18rem";
                tarjeta.innerHTML = `
            <img src="${producto.img}" class="card-img-top" alt="${producto.nombre}">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">$${producto.precio}</p>
            </div>
            <a href="#" class="btn btn-primary">COMPRAR</a>
        `;
                contenedor.appendChild(tarjeta);
            });
        })
        .catch(error => {
            Swal.fire({
                title: "Error",
                text: "Error en la carga de productos. Intenta nuevamente",
                icon: "error",
                confirmButtonText: "Cerrar"
            });
            console.error(error);
        });

    //Inicializacion del carrito    

    let carrito = [];
    actualizarCarrito();

    //Abrir carrito de compras con el icono

    iconoCarrito.addEventListener('click', (event) => {
        event.preventDefault();
        checkout.classList.add('open');
    });

    // Modal finalizacion de compra

    const modal = document.createElement('div');
    modal.classList.add('modal', 'fade');
    modal.id = 'modalCompra';
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Finalizar Compra</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="formCompra">
                        <div class="mb-3">
                            <label for="nombre" class="form-label">Nombre</label>
                            <input type="text" class="form-control" id="nombre" required>
                        </div>
                        <div class="mb-3">
                            <label for="apellido" class="form-label">Apellido</label>
                            <input type="text" class="form-control" id="apellido" required>
                        </div>
                        <div class="mb-3">
                            <label for="correo" class="form-label">Correo</label>
                            <input type="email" class="form-control" id="correo" required>
                        </div>
                        <div class="mb-3">
                            <label for="pago" class="form-label">Método de Pago</label>
                            <select class="form-select" id="pago" required>
                                <option value="transferencia">Depósito/Transferencia</option>
                                <option value="debito">Tarjeta Débito</option>
                                <option value="credito">Tarjeta Crédito</option>
                            </select>
                        </div>
                        <div id="extraOpciones" class="d-none">
                            <label for="cuotas" class="form-label">Cuotas</label>
                            <select class="form-select" id="cuotas">
                                <option value="3">3 sin interés</option>
                                <option value="6">6 sin interés</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" id="confirmarCompra">Confirmar</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const modalCompra = new bootstrap.Modal(document.getElementById('modalCompra'));

    //Evento para comprar productos

    contenedor.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-primary')) {
            event.preventDefault();
            const producto = event.target.closest('.card');
            const nombreProducto = producto.querySelector('.card-title').textContent;
            const precioProducto = parseInt(producto.querySelector('.card-text').textContent.replace(/\D/g, ""));
            const imgProducto = producto.querySelector('.card-img-top').src;

            agregarProductoAlCarrito({ nombre: nombreProducto, precio: precioProducto, img: imgProducto });
            checkout.classList.add('open');
        }
    });

    //Finalizacion de compra una vez seleccionado los productos deseados

    finalizarCompraBtn.addEventListener('click', () => {
        if (carrito.length === 0) {
            mostrarMensajeModal("El carrito está vacío", 'warning', '');
            return;
        }
        modalCompra.show();
    });

    document.getElementById('pago').addEventListener('change', (event) => {
        const metPago = event.target.value;
        const extraOpciones = document.getElementById('extraOpciones');

        extraOpciones.classList.toggle('d-none', metPago !== 'credito');
        actualizarCarrito(metPago);
    });

    //Eventos para cerrar el carrito con la "X" o añadir mas productos

    cerrarCarritoBtn.addEventListener('click', () => {
        checkout.classList.remove('open');
    });

    anadirProductosBtn.addEventListener('click', () => {
        checkout.classList.remove('open');
    });

    // Confirmacion de compra

    document.getElementById('confirmarCompra').addEventListener('click', () => {
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const correo = document.getElementById('correo').value.trim();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
        const pago = document.getElementById('pago').value;
        let cuotas = document.getElementById('cuotas').value;

        if (!nombre || !apellido || !correo || !emailRegex.test(correo) || !pago) {

            //si no se completa los datos o el correo no tiene los datos correctos

            modalCompra.hide();
            mostrarMensajeModal("Para continuar con tu compra, deberás completar todos los campos", 'error', '');
            $('#mensajeModal').on('hidden.bs.modal', function () {
                modalCompra.show();
            });
            return;
        }

        let totalCompra = carrito.reduce((sum, producto) => sum + producto.precio, 0);
        let mensaje = `¡Gracias ${nombre} ${apellido} por tu compra! `;

        if (pago === 'transferencia' || pago === 'debito') {
            const montoConDescuento = totalCompra * 0.9;
            mensaje += `Tienes un descuento del 10%, el monto es $${montoConDescuento.toFixed(0)}. Recibiras los detalles al correo ${correo}.`;
        } else if (pago === 'credito') {
            cuotas = cuotas || 1;
            const valorCuota = totalCompra / cuotas;
            mensaje += `Las cuotas serán de $${valorCuota.toFixed(0)}. Por favor, ingresa los datos de la tarjeta.`;
        }

        localStorage.setItem('compra', JSON.stringify({
            cliente: `${nombre} ${apellido}`,
            metodoPago: pago,
            total: totalCompra
        }));
        mostrarMensajeModal(mensaje, 'success', '¡Compra exitosa!');
        modalCompra.hide();
        carrito = [];
        checkout.classList.remove('open');
        actualizarCarrito(pago);
    });

    //Funcion para agregar productos al carrito

    function agregarProductoAlCarrito(producto) {
        carrito.push(producto);
        actualizarCarrito();

        Toastify({
            text: "Producto añadido correctamente",
            duration: 3000,
            close: true,
            gravity: "bottom",
            position: "right",
            backgroundColor: "#4CAF50",
            stopOnFocus: true
        }).showToast();
    }

    //Eliminacion de productos no deseados del carrito

    function eliminarProducto(nombre) {
        carrito = carrito.filter(producto => producto.nombre !== nombre);
        actualizarCarrito();

        Toastify({
            text: "Producto eliminado correctamente",
            duration: 3000,
            close: true,
            gravity: "bottom",
            position: "right",
            backgroundColor: "#dc3545",
            stopOnFocus: true
        }).showToast();
    }

    //Actualizacion del carrito a medida que se agrega o elimina productos

    function actualizarCarrito(metPago = '') {
        cartItems.innerHTML = '';
        cartItems.innerHTML = carrito.length === 0
            ? '<p>Tu carrito está vacío</p>'
            : carrito.map(producto => `
        <div class="product-card">
            <img src="${producto.img}" alt="${producto.nombre}">
            <div class="details">
                <h5>${producto.nombre}</h5>
                <p>Precio: $${producto.precio}</p>
            </div>
            <span class="remove" data-nombre="${producto.nombre}">&times;</span>
        </div>
    `).join('');

        let totalPrecio = carrito.reduce((sum, producto) => sum + producto.precio, 0);
        if (metPago === 'transferencia' || metPago === 'debito') {
            totalPrecio *= 0.9;
        }

        total.textContent = `Total: $${totalPrecio.toFixed(2)}`;

        // Manejo de eventos para eliminar productos

        const botonesEliminar = document.querySelectorAll('.remove');
        botonesEliminar.forEach(boton => {
            boton.addEventListener('click', () => {
                const nombre = boton.getAttribute('data-nombre');
                eliminarProducto(nombre);
            });
        });
    }

    //Notificaciones al usuario mediante SweetAlert

    function mostrarMensajeModal(mensaje, tipo = 'info', titulo = 'Información') {
        Swal.fire({
            title: titulo,
            text: mensaje,
            icon: tipo,
            confirmButtonText: 'Cerrar'
        });
    }

});
