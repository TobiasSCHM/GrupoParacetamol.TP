import { MOCK_PRODUCTOS, MOCK_USUARIOS, MOCK_VENTAS } from './mockData.js';

export const USE_MOCK = true;   // ✅ Modo mock activado
export const API_BASE = "http://localhost:3000";

/* ======== MOCK con persistencia ======== */
function loadMockData() {
  const stored = localStorage.getItem('productos_mock');
  if (stored) return JSON.parse(stored);
  localStorage.setItem('productos_mock', JSON.stringify(MOCK_PRODUCTOS));
  return JSON.parse(JSON.stringify(MOCK_PRODUCTOS));
}

function saveMockData(data) {
  localStorage.setItem('productos_mock', JSON.stringify(data));
}

/* ======== FUNCIONES CRUD ======== */

export async function fetchProductos() {
  if (USE_MOCK) return loadMockData();
  const res = await fetch(`${API_BASE}/productos_fotos`);
  return res.json();
}

export async function apiCreateProducto(formData) {
  if (USE_MOCK) {
    const productos = loadMockData();
    const obj = Object.fromEntries(formData.entries());
    const nuevo = {
      codigo: Date.now(),
      marca: obj.marca,
      precio: Number(obj.precio),
      categoria: obj.categoria,
      activo: obj.activo === 'true' || obj.activo === 'on',
      path: 'img/no-image.png'
    };
    productos.push(nuevo);
    saveMockData(productos);
    console.log("Producto agregado:", nuevo);
    return nuevo;
  }

  return fetch(`${API_BASE}/productos_fotos`, { method: 'POST', body: formData });
}

export async function apiUpdateProducto(codigo, formData) {
  if (USE_MOCK) {
    const productos = loadMockData();
    const idx = productos.findIndex(p => String(p.codigo) === String(codigo));
    if (idx === -1) throw new Error('Producto no encontrado');

    const obj = Object.fromEntries(formData.entries());
    productos[idx] = {
      ...productos[idx],
      marca: obj.marca,
      precio: Number(obj.precio),
      categoria: obj.categoria,
      activo: obj.activo === 'true' || obj.activo === 'on',
    };
    saveMockData(productos);
    console.log("Producto actualizado:", productos[idx]);
    return productos[idx];
  }

  return fetch(`${API_BASE}/productos_fotos/${codigo}`, { method: 'PUT', body: formData });
}

export async function apiDeleteProducto(codigo) {
  if (USE_MOCK) {
    const productos = loadMockData().filter(p => String(p.codigo) !== String(codigo));
    saveMockData(productos);
    console.log("Producto eliminado:", codigo);
    return { ok: true };
  }

  return fetch(`${API_BASE}/productos_fotos/${codigo}`, { method: 'DELETE' });
}

/* ======== LOGIN ======== */
export async function loginAdmin(email, password) {
  if (USE_MOCK) {
    const user = MOCK_USUARIOS.find(u => u.email === email && u.password === password);
    if (!user) throw new Error('Credenciales inválidas');
    return { token: 'FAKE_TOKEN', user };
  }
  throw new Error('Backend no implementado');
}

/* ======== VENTAS ======== */
export async function postVenta(venta) {
  if (USE_MOCK) {
    const ventas = JSON.parse(localStorage.getItem('ventas_mock') || '[]');
    ventas.push(venta);
    localStorage.setItem('ventas_mock', JSON.stringify(ventas));
    console.log("Venta registrada:", venta);
    return { ok: true };
  }

  return fetch(`${API_BASE}/ventas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(venta)
  });
}
