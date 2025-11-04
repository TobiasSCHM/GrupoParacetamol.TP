import { fetchProductos, apiDeleteProducto } from './api.js';

const list = document.getElementById('adminList');

async function load() {
  list.innerHTML = '<p class="text-muted">Cargando productos...</p>';
  try {
    const prods = await fetchProductos();
    console.log('Productos cargados:', prods);

    if (!prods || !prods.length) {
      list.innerHTML = '<p class="text-muted">No hay productos disponibles.</p>';
      return;
    }

    list.innerHTML = '';
    prods.forEach(p => {
      const col = document.createElement('div');
      col.className = 'col-md-4';
      col.innerHTML = `
        <div class="card p-3 h-100 shadow-sm">
          <img src="${p.path || 'img/no-image.png'}" class="card-img-top mb-3" style="height:160px;object-fit:cover">
          <h5>${p.marca}</h5>
          <p class="text-muted">$${p.precio}</p>
          <p class="text-muted small">Activo: ${p.activo ? 'Sí' : 'No'}</p>
          <div class="d-flex gap-2 mt-3">
            <a href="modificar.html?codigo=${p.codigo}" class="btn btn-sm btn-primary flex-grow-1">Editar</a>
            <button class="btn btn-sm btn-danger del flex-grow-1">Eliminar</button>
          </div>
        </div>`;
      
      col.querySelector('.del').addEventListener('click', async () => {
        if (!confirm(`¿Eliminar ${p.marca}?`)) return;
        try {
          await apiDeleteProducto(p.codigo);
          load();
        } catch (e) {
          console.error(e);
          alert('Error al eliminar producto');
        }
      });

      list.appendChild(col);
    });
  } catch (err) {
    console.error('Error cargando productos:', err);
    list.innerHTML = '<p class="text-danger">Error cargando productos</p>';
  }
}

load();
