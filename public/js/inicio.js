// Codigo para blog que se despliegue texto al darle click a "ver mas"
const botonesVerMas = document.querySelectorAll('.ver-mas');

botonesVerMas.forEach(boton => {
  boton.addEventListener('click', () => {
    const texto = boton.previousElementSibling;
    if (texto.style.display === 'none') {
      texto.style.display = 'block';
      boton.innerText = 'Ver menos';
    } else {
      texto.style.display = 'none';
      boton.innerText = 'Ver más';
    }
  });
});


const obtenerDatosDeProducto = async (ids) => {
    const response = await fetch('http://localhost:5000/api/product/');
    const data = await response.json();
    const filteredData = data.filter(producto => ids.includes(producto.ID));
    const productoData = await Promise.all(filteredData.map(async ({ ID, PRODUCTO, IMAGEN, PRECIO }) => ({
      id: ID,
      name: PRODUCTO,
      imagen: IMAGEN,
      precio: PRECIO
    })));
    return productoData;
  };
  
  const mostrarProductos = async () => {
    const contenedorProductos = document.getElementById('productos');
    const productos = await obtenerDatosDeProducto([24, 14, 6, 5, 7,10]);
    productos.forEach(({ id, name, imagen, precio }) => {
      const productoLink = document.createElement('a');
      productoLink.href = `http://localhost:3000/detallesProducto?id=${id}`;
      const productoDiv = document.createElement('div');
      productoDiv.classList.add('productosInicio');
      const imagenProducto = document.createElement('img');
      imagenProducto.src = imagen;
      const nombreProducto = document.createElement('h4');
      nombreProducto.textContent = name;
      const precioProducto = document.createElement('p');
      precioProducto.textContent = precio.toLocaleString('es-ES', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 });
      precioProducto.classList.add('precio');
  
      productoDiv.appendChild(imagenProducto);
      productoDiv.appendChild(nombreProducto);
      productoDiv.appendChild(precioProducto);
      productoLink.appendChild(productoDiv);
      contenedorProductos.appendChild(productoLink);
    });
  };
  
  mostrarProductos().catch((error) => {
    console.error(error);
  });


  