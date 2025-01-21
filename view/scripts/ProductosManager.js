const productosContainer = document.getElementById("productosContainer");
const notification = document.getElementById("notification");
const searchInput = document.getElementById("searchInput");

async function loadProductos(){
    fetch("http://localhost:3003/api/productos/viewAllProductos")
    .then(respuesta => respuesta.json())
    .then((datos) => {
        datos.allProductos.forEach((elementos) => {
            const newProducto = document.createElement("div");
            newProducto.classList.add(
                "producto",
                "bg-gray-800",
                "rounded-lg",
                "shadow-md",
                "p-4",
                "flex",
                "flex-col",
                "items-center",
                "text-center",
                "space-y-3",
                "hover:shadow-xl",
                "transition"
            );
            newProducto.setAttribute("data-nombre", elementos.nombre);
            newProducto.innerHTML = `
            <img src="${elementos.imagen}" alt="producto" class="w-32 h-32 object-cover rounded-md">
            <span class="text-lg font-semibold text-gray-100">${elementos.nombre}</span>
            <span class="text-blue-400 font-bold text-lg">$${elementos.precio}</span>
            <button class="px-4 py-2 bg-red-500 text-gray-100 rounded-lg hover:bg-red-600 transition" onclick="deleteProducto('${elementos.nombre}')">Eliminar</button>
            `;
            productosContainer.appendChild(newProducto);   
        });
    })
    .catch(error => {
        console.log("error: "+error);
    });
}

loadProductos();

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const productos = document.querySelectorAll('.producto');
    
    productos.forEach(producto => {
        const nombre = producto.getAttribute('data-nombre').toLowerCase();
        
        if (nombre.includes(query)) {
            producto.style.display = '';
        } else {
            producto.style.display = 'none';
        }
    });
});

async function addProducto() {
    const productoNombre = document.getElementById("productoNombre").value;
    const productoPrecio = document.getElementById("productoPrecio").value;

    if (productoNombre.length === 0 || productoPrecio.length === 0) {
        notificationManager("Debes agregar un producto para usar esta funcion");
        return;
    }

    try {
        const data = {
            nombre: productoNombre,
            precio: Number(productoPrecio),
        };

        const response = await fetch("http://localhost:3003/api/productos/createProducto", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            window.location.reload();
        } else {
            notificationManager("Error al agregar el producto");
        }
    } catch (err) {
        notificationManager("Error interno del sistema al agregar el producto");
    }
}

async function notificationManager(error){
    notification.classList.remove("hidden");
    notification.classList.add("flex");
    notification.innerText = `¡${error}! `;

    setTimeout(() => {
        notification.classList.add("hidden");
        notification.classList.remove("flex");
    }, 2000);
}

async function deleteProducto(nombreProducto) {
    const data ={
        nombre:nombreProducto
    }
    try {
        const response = await fetch("http://localhost:3003/api/productos/deleteProducto",{
            method:"DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            console.log("Error al eliminar el producto");
            return;
        }

        const productoEliminado = document.querySelector(`.producto[data-nombre='${nombreProducto}']`);
        if (productoEliminado) {
            productoEliminado.remove();
        }
    } catch (error) {
        console.log("Error al eliminar el producto");
    }
}
