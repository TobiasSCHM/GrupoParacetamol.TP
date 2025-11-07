import { apiCreateProducto } from './api.js';

const form = document.getElementById('altaForm');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const fd = new FormData(form);
  fd.set('activo', document.getElementById('activo').checked ? 'true' : 'false');

  try {
    await apiCreateProducto(fd);
    alert('Producto agregado correctamente.');
    location.href = 'dashboard.html';
  } catch (err) {
    console.error(err);
    alert('Error al crear producto.');
  }
});
