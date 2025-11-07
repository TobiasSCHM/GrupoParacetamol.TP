import { postVenta } from './api.js';

const listEl = document.getElementById('carritoItems');
const totalEl = document.getElementById('total');
const confirmar = document.getElementById('confirmarCompra');

function render(){
  const cart = JSON.parse(localStorage.getItem('carrito')||'[]');
  listEl.innerHTML = '';
  if(!cart.length) listEl.innerHTML = '<p class="text-muted">Carrito vacío</p>';
  let total = 0;
  cart.forEach((it, idx)=>{
    const card = document.createElement('div'); card.className='card p-3 mb-3';
    card.innerHTML = `
      <div class="d-flex align-items-center gap-3">
        <img src="${it.path||'img/no-image.png'}" style="width:80px;height:80px;object-fit:cover;border-radius:8px">
        <div class="flex-grow-1">
          <h5 class="mb-1">${it.marca}</h5>
          <p class="mb-1 text-muted">$${it.precio} c/u</p>
          <div class="d-flex gap-2 align-items-center">
            <button class="btn btn-sm btn-outline-secondary menos">-</button>
            <span class="mx-2">${it.cantidad}</span>
            <button class="btn btn-sm btn-outline-secondary mas">+</button>
            <button class="btn btn-sm btn-danger ms-3 eliminar">Eliminar</button>
          </div>
        </div>
        <div class="text-end">
          <div class="fw-bold">$${it.precio * it.cantidad}</div>
        </div>
      </div>
    `;
    card.querySelector('.mas').addEventListener('click', ()=>{ it.cantidad++; save(cart); render(); });
    card.querySelector('.menos').addEventListener('click', ()=>{ if(it.cantidad>1){ it.cantidad--; save(cart); render(); }});
    card.querySelector('.eliminar').addEventListener('click', ()=>{ cart.splice(idx,1); save(cart); render(); });
    listEl.appendChild(card);
    total += it.precio * it.cantidad;
  });
  totalEl.textContent = total;
}

function save(cart){ localStorage.setItem('carrito', JSON.stringify(cart)); }

confirmar.addEventListener('click', async ()=>{
  const nombre = sessionStorage.getItem('clienteNombre');
  if(!nombre) return alert('Falta el nombre del cliente. Volvé a inicio.');
  const cart = JSON.parse(localStorage.getItem('carrito')||'[]');
  if(!cart.length) return alert('Carrito vacío');
  if(!confirm('Confirmar compra?')) return;
  const venta = { cliente: nombre, fecha: new Date().toISOString(), total: cart.reduce((s,i)=>s+i.precio*i.cantidad,0), items: cart };
  try{
    await postVenta(venta);
    sessionStorage.setItem('ultimoTicket', JSON.stringify(venta));
    localStorage.removeItem('carrito');
    location.href = 'ticket.html';
  }catch(e){
    console.error(e);
    alert('Error procesando la compra');
  }
});

render();
