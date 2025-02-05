🛒 Proyecto JavaScript de Tienda E-commerce

Descripción:

Este proyecto se basa en una tienda online de ventas de celulares y accesorios interactiva, la misma esta desarrollada con HTML, CSS y JavaScript. Permite a los usuarios agregar productos al carrito, visualizar el total de la compra y finalizar la compra completando un formulario con validaciones. Se utiliza localStorage para almacenar la información de la compra, SweetAlert y Toastify para las notificaciones al usuario.

Características destacadas:

🔹 Listado de productos que se obtiene de un archivo JSON.

🔹 Carrito de compras que te permite agregar o eliminar productos.

🔹 Métodos de pago con descuentos y financiación en cuotas.

🔹 Interfaz moderna con Bootstrap, notificaciones con Sweet Alert y Toastify.

🔹 Almacenamiento en localStorage para persistencia de datos.

Tecnologías utilizadas:

🔸 HTML5: Estructura del sitio.

🔸 Bootstrap: Estilos y diseños responsivos.

🔸 JavaScript: Lógica de la tienda y manejo del DOM.

🔸 Toastify: Notificaciones emergentes.

🔸 SweetAlert: Notificaciones personalizadas para notificaciones de confirmaciones y errores.

Estructura del proyecto

📁 ProyectoJavaScript2024

↳ 📁 css
    
    style.css

↳ 📁 data
    
    productos.json

↳ 📁 images
    
    logo.png

↳ 📁 sass

   ↳ 📁 presets
          
          _colors.scss
          
          _footer.scss
          
          _header.scss
          
          _main.scss
          
          _resets.scss
          
    _index.scss
    
    _style.scss

↳ 📁 scripts
    
    main.js

index.html

README.md

Instalación y uso

1. Clona el repositorio: https://github.com/MaicoRod/ProyectoJavaScript2024.git
2. Abre el archivo index.html en el navegador.

Funcionalidades

● Agregar productos al carrito:
Los productos provenientes del archivo JSON que se muestran a traves de tarjetas, pueden ser agregados al carrito al hacer click en "comprar".

● Ver y controlar el carrito:
Los usuarios podran visualizar el carrito de compras con los productos agregados y eliminarlos de ser necesario. El total se va actualizando

● Finalizar compra:
Una vez que los usuarios den click en "Finalizar compra" se abrira una ventana emergente donde debera completar un formulario y seleccionar el método de pago deseado, en base a eso se le aplicara un descuento o se le financiara la compra.

● Notificaciones y alertas:

_Toastify: muestra mensajes cuando se agrega o elimina productos del carrito.

_SweetAlert: muestra mensajes de confirmación y errores.

Futuras actualizaciones:

● Registro de usuario.

● Buscar productos a traves de la barra de busqueda.

● Agregar filtros y categorias de productos.

● Guardar productos favoritos para futuras compras.

ENTREGA FINAL

Maico Rodriguez
