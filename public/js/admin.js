const obtenerDatosDeProducto = async () => {
  const response = await fetch('http://localhost:5000/api/product/');
  const data = await response.json();
  const productoData = await Promise.all(data.map(async ({ ID, PRODUCTO, IMAGEN, DESCRIPCION, PRECIO, ESTADO }) => ({
    id: ID,
    name: PRODUCTO,
    imagen: IMAGEN,
    descripcion: DESCRIPCION,
    precio: PRECIO,
    estado: ESTADO
  })));
  return productoData;
};

const mostrarProductos = async () => {
  const contenedorProductos = document.getElementById('productos');
  const productos = await obtenerDatosDeProducto();
  productos.forEach(({ id, name, imagen, descripcion, precio, estado }) => {
    const productoDiv = document.createElement('div');
    productoDiv.classList.add('producto');
    const idProducto = document.createElement('h4');
    idProducto.textContent = "ID: "+id;
    const imagenProducto = document.createElement('img');
    imagenProducto.src = imagen;
    const nombreProducto = document.createElement('h4');
    nombreProducto.textContent = name;
    const precioProducto = document.createElement('p');
    precioProducto.textContent = precio.toLocaleString('es-ES', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 });
    precioProducto.classList.add('precio');
    const estadoProducto = document.createElement('p');
    estadoProducto.textContent = estado ? 'Disponible' : 'No disponible';
    estadoProducto.classList.add('estado');
    const eliminarProductoButton = document.createElement('button');
    eliminarProductoButton.classList.add('eliminar-producto');
    eliminarProductoButton.dataset.id = id;
    eliminarProductoButton.textContent = 'Eliminar';
    eliminarProductoButton.addEventListener('click', () => {
      eliminarProducto(id);
    });

    productoDiv.appendChild(idProducto);
    productoDiv.appendChild(imagenProducto);
    productoDiv.appendChild(nombreProducto);
    productoDiv.appendChild(precioProducto);
    productoDiv.appendChild(estadoProducto);
    productoDiv.appendChild(eliminarProductoButton);
    contenedorProductos.appendChild(productoDiv);
  });
};


const eliminarProducto = async (id) => {
  const confirmacion = confirm('¿Está seguro que desea eliminar este producto?');

  if (confirmacion) {
    const options = {
      method: 'DELETE'
    };

    const responseEliminar = await fetch(`http://localhost:5000/api/product/${id}`, options);
    // const data = await responseEliminar.json();

    alert('Producto eliminado exitosamente');
    location.reload();
  }
};

mostrarProductos().catch((error) => {
  console.error(error);
});