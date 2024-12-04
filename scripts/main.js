const botonesComprar = document.querySelectorAll(".btn-primary");

botonesComprar.forEach((boton) => {
    boton.addEventListener("click", () => {

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

        let pago;

        do {
            pago = prompt("¿Cómo vas a pagar?\n1. Depósito/Transferencia\n2. Tarjeta (Débito o Crédito)");

            switch (pago) {
                case "1":
                    // Seleccionar solo el precio de la tarjeta asociada al botón
                    const tarjeta = boton.closest(".card");
                    const precioTexto = tarjeta.querySelector(".card-text").textContent;
                    const precioLista = parseInt(precioTexto.replace(/\D/g, ""));
                    const descuento = precioLista * 0.1;
                    const precioDescuento = precioLista - descuento;

                    alert("Tienes un descuento del 10%. Deberás abonar: $" + precioDescuento + ". Recibirás los detalles por correo.");
                    break;

                case "2":
                    let tipoTarjeta;
                    const tarjetaSeleccionada = boton.closest(".card");
                    const precioTarjeta = parseInt(
                        tarjetaSeleccionada.querySelector(".card-text").textContent.replace(/\D/g, "")
                    );

                    do {
                        tipoTarjeta = prompt("¿Tarjeta de Débito o Crédito?\n1. Débito\n2. Crédito");
                        if (tipoTarjeta === "1") {
                            // Aplica descuento si es débito
                            const descuentoDebito = precioTarjeta * 0.1;
                            const precioFinal = precioTarjeta - descuentoDebito;
                            alert("Tienes un descuento del 10%, deberás abonar: $" + precioFinal + ". Por favor, ingresa los datos de la tarjeta.");
                        } else if (tipoTarjeta === "2") {
                            // Cálculo de cuotas
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
});
