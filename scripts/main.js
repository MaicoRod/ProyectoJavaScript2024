const botonesComprar = document.querySelectorAll(".btn-primary");

botonesComprar.forEach((boton) => {
    boton.addEventListener("click", () => {

        let nombre = prompt("Ingresa tu nombre:");
        let apellido = prompt("Ingresa tu apellido:");

        if (nombre && apellido) {
            alert("¡Hola " + nombre + " " + apellido + " bienvenido/a a QueCel!");
        } else {
            alert("Debe completar los datos para avanzar");
            return;
        }

        let pago = prompt("¿Cómo vas a pagar? Elige entre:\n1. Depósito/Transferencia\n2. Tarjeta (Débito o Crédito)\n3. Mercado Pago");

        if (pago) {

            switch (pago) {
                case "1":
                    alert("Tienes un 10% de descuento. Recibirás los detalles por correo.");
                    break;
                case "2":
                case "2":
                    let tipoTarjeta = prompt("¿Es tarjeta de Débito o Crédito?\n1.Débito\n2.Crédito");
                    if (tipoTarjeta) {
                        switch (tipoTarjeta) {
                            case "1":
                                alert("Tienes un 10% de descuento. Por favor, ingresa los datos de tu tarjeta Débito.");
                                break;
                            case "2":
                                alert("Por favor, ingresa los datos de tu tarjeta Crédito.");
                                break;
                            default:
                                alert("Opción de tarjeta incorrecta. Por favor, elige 'Débito' o 'Crédito'.");
                        }
                    } else {
                        alert("Opción de tarjeta incorrecta.");
                    }
                    break;
                case "3":
                    alert("Elegiste Mercado Pago. Serás redirigido a la página de pago.");
                    break;
                default:
                    alert("Opción incorrecta. Por favor, elige una opción válida.");
            }
        } else {
            alert("Opción incorrecta.");
        }

    });
});
