import { fetchProductos, apiUpdateProducto } from './api.js';

const form = document.getElementById('modForm');
const params = new URLSearchParams(location.search);
const codigo = params.get('codigo');

async function cargarProducto() {
  try {
    const productos = await fetchProductos();
    const p = productos.find(prod => String(prod.codigo) === String(codigo));
    if (!p) {
      alert('Producto no encontrado');
      location.href = 'dashboard.html';
      return;
    }

    document.getElementById('codigo').value = p.codigo;
    document.getElementById('marca').value = p.marca;
    document.getElementById('precio').value = p.precio;
    document.getElementById('categoria').value = p.categoria;
    document.getElementById('activo').checked = p.activo;
  } catch (err) {
    console.error(err);
    alert('Error al cargar el producto.');
  }
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  const fd = new FormData(form);
  fd.set('activo', document.getElementById('activo').checked ? 'true' : 'false');

  try {
    await apiUpdateProducto(codigo, fd);
    alert('Cambios guardados correctamente.');
    location.href = 'dashboard.html';
  } catch (err) {
    console.error(err);
    alert('Error al guardar cambios.');
  }
});

cargarProducto();
