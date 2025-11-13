import { fetchProductos } from './api.js';

const grid = document.getElementById('productosGrid');
const search = document.getElementById('search');
const cat = document.getElementById('categoriaFilter');
const cartCount = document.getElementById('cart-count');
const prev = document.getElementById('prevPage');
const nextBtn = document.getElementById('nextPage');
const info = document.getElementById('paginacionInfo');

let productos = [];
let page = 1, perPage = 9;

function updateCartCount(){
  const cart = JSON.parse(localStorage.getItem('carrito')||'[]');
  cartCount.textContent = cart.reduce((s,i)=>s+i.cantidad,0);
}

function renderItems(list){
  grid.innerHTML = '';
  if(!list.length) grid.innerHTML = '<p class="text-muted">No hay productos</p>';
  list.forEach(p=>{
    if(p.activo===false) return;
    const col = document.createElement('div'); col.className='col-md-4';
    col.innerHTML = `
      <div class="card h-100">
        <img src="${p.path||'img/no-image.png'}" class="card-img-top" alt="${p.marca}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${p.marca}</h5>
          <p class="card-text text-muted mb-3">$${p.precio}</p>
          <div class="mt-auto">
          <button class="btn btn-success add-btn w-100">Agregar</button>
          </div>
        </div>
      </div>`;
    col.querySelector('.add-btn').addEventListener('click', ()=> addToCart(p));
    grid.appendChild(col);
  });
}

function addToCart(product){
  const cart = JSON.parse(localStorage.getItem('carrito')||'[]');
  const idx = cart.findIndex(i=>String(i.codigo)===String(product.codigo));
  if(idx===-1) cart.push({...product, cantidad:1});
  else cart[idx].cantidad++;
  localStorage.setItem('carrito', JSON.stringify(cart));
  updateCartCount();
}

function paginate(items){
  const start = (page-1)*perPage;
  const out = items.slice(start, start+perPage);
  info.textContent = `Página ${page} de ${Math.ceil(items.length/perPage) || 1}`;
  prev.disabled = page<=1;
  nextBtn.disabled = start+perPage >= items.length;
  return out;
}

async function load(){
  try{
    productos = await fetchProductos();
    applyFilters();
  }catch(e){
    console.error(e);
    grid.innerHTML = '<p class="text-danger">Error cargando productos</p>';
  }
}

function applyFilters(){
  let filtered = productos;
  const q = (search.value||'').toLowerCase().trim();
  if(cat.value !== 'all') filtered = filtered.filter(p => p.categoria === cat.value || p.tipo === cat.value);
  if(q) filtered = filtered.filter(p => (p.marca||'').toLowerCase().includes(q));
  const pageItems = paginate(filtered);
  renderItems(pageItems);
}

search.addEventListener('input', ()=>{ page = 1; applyFilters(); });
cat.addEventListener('change', ()=>{ page = 1; applyFilters(); });
prev.addEventListener('click', ()=>{ if(page>1){ page--; applyFilters(); }});
nextBtn.addEventListener('click', ()=>{ page++; applyFilters(); });

updateCartCount();
load();
