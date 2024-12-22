document.addEventListener('DOMContentLoaded', () => {
    
    //Se declaran las variables
    
    const botonesComprar = document.querySelectorAll('.btn-primary');
    const checkout = document.getElementById('checkout');
    const cartItems = document.getElementById('cart-items');
    const total = document.getElementById('total');
    const finalizarCompraBtn = document.getElementById('finalizar-compra');
    
    //Inicializamos el carrito

    let carrito = [];

    //Aplicacion de evento a al boton de "Comprar"

    botonesComprar.forEach(boton => {
        boton.addEventListener('click', (event) => {
            event.preventDefault();

            //Datos a obtener de la tarjeta de productos para el carrito

            const producto = event.currentTarget.closest('.card');
            const nombreProducto = producto.querySelector('.card-title').textContent;
            const precioProducto = parseInt(producto.querySelector('.card-text').textContent.replace(/\D/g, ""));
            const imgProducto = producto.querySelector('.card-img-top').src;

            //Producto agregado al carrito en lista a medida que sumamos productos

            agregarProductoAlCarrito({ nombre: nombreProducto, precio: precioProducto, img: imgProducto });
            checkout.classList.add('open');
        });
    });

    //Aplicacion de evento al boton "Finalizar compra"

    finalizarCompraBtn.addEventListener('click', (event) => {
        event.preventDefault();

        let nombre;
        let apellido;

        // Pedir nombre y apellido
        do {
            nombre = prompt("Ingresa tu nombre:");
            if (!nombre) alert("Debes ingresar tu nombre para avanzar");
        } while (!nombre);

        do {
            apellido = prompt("Ingresa tu apellido:");
            if (!apellido) alert("Debes ingresar tu apellido para avanzar");
        } while (!apellido);

        alert("Hola " + nombre + " " + apellido + " bienvenido/a a QueCel");

        //Eleccion de metodo de pago

        let pago;

        do {
            pago = prompt("¿Cómo vas a pagar?\n1. Depósito/Transferencia\n2. Tarjeta (Débito o Crédito)");

            switch (pago) {
                case "1":  
                    const descuentoTotal = carrito.reduce((sum, producto) => sum + producto.precio, 0) * 0.1;
                    const precioDescuento = carrito.reduce((sum, producto) => sum + producto.precio, 0) - descuentoTotal;

                    alert("Tienes un descuento del 10%. Deberás abonar: $" + precioDescuento + ". Recibirás los detalles por correo.");
                    break;

                case "2":
                    let tipoTarjeta;
                    const precioTarjeta = carrito.reduce((sum, producto) => sum + producto.precio, 0);

                    do {
                        tipoTarjeta = prompt("¿Tarjeta de Débito o Crédito?\n1. Débito\n2. Crédito");
                        if (tipoTarjeta === "1") {
                            const descuentoDebito = precioTarjeta * 0.1;
                            const precioFinal = precioTarjeta - descuentoDebito;
                            alert("Tienes un descuento del 10%, deberás abonar: $" + precioFinal + ". Por favor, ingresa los datos de la tarjeta.");
                        } else if (tipoTarjeta === "2") {
                            const tresCuotas = (precioTarjeta / 3).toFixed(2);
                            const seisCuotas = (precioTarjeta / 6).toFixed(2);
                            const cuotas = prompt("¿Cuántas cuotas?\n1. 3 sin interés\n2. 6 sin interés");
                            if (cuotas === "1") {
                                alert("Las cuotas serán de: $" + tresCuotas + ". Por favor, ingresa los datos de la tarjeta.");
                            } else if (cuotas === "2") {
                                alert("Las cuotas serán de: $" + seisCuotas + ". Por favor, ingresa los datos de la tarjeta.");
                            } else {
                                alert("Opción incorrecta, intenta nuevamente");
                            }
                        } else {
                            alert("Opción incorrecta, intenta nuevamente");
                        }
                    } while (tipoTarjeta !== "1" && tipoTarjeta !== "2");
                    break;

                default:
                    alert("Opción incorrecta. Por favor, intenta nuevamente");
                    break;
            }
        } while (pago !== "1" && pago !== "2");
    });

    //Declaramos funcion para agregar productos al carrito

    function agregarProductoAlCarrito(producto) {
        carrito.push(producto);
        actualizarCarrito();
    }

    //Funcion que permite que a medida que se agreguen productos al carrito se vaya actualizando

    function actualizarCarrito() {
        cartItems.innerHTML = '';
        carrito.forEach(producto => {
            const item = document.createElement('div');
            item.classList.add('product-card');
            item.innerHTML = `
                <img src="${producto.img}" alt="${producto.nombre}">
                <div class="details">
                    <h5>${producto.nombre}</h5>
                    <p>Precio: $${producto.precio}</p>
                </div>
                <span class="remove" data-nombre="${producto.nombre}">&times;</span>
            `;
            cartItems.appendChild(item);
        });

        //Sumamos la totalidad de productos agregados al carrito

        const totalPrecio = carrito.reduce((sum, producto) => sum + producto.precio, 0);
        total.textContent = `Total: $${totalPrecio}`;

        //En caso de querer eliminar productos

        const botonesEliminar = document.querySelectorAll('.remove');
        botonesEliminar.forEach(boton => {
            boton.addEventListener('click', () => {
                const nombre = boton.getAttribute('data-nombre');
                eliminarProducto(nombre);
            });
        });
    }

    //Declaracion de funcion para la eliminacion de la tarjeta de producto
    
    function eliminarProducto(nombre) {
        carrito = carrito.filter(producto => producto.nombre !== nombre);
        actualizarCarrito();
    }

    document.getElementById('cerrar-carrito').addEventListener('click', () => {
        checkout.classList.remove('open');
    });
});

