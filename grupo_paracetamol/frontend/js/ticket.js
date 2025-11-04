const ticketEl = document.getElementById('ticketContent');
const downloadBtn = document.getElementById('downloadPdf');
const volver = document.getElementById('volverInicio');

const ticket = JSON.parse(sessionStorage.getItem('ultimoTicket')||'null');

if(!ticket){
  ticketEl.innerHTML = '<p class="text-muted">No hay ticket disponible</p>';
}else{
  const d = new Date(ticket.fecha);
  ticketEl.innerHTML = `
    <h5>Cliente: ${ticket.cliente}</h5>
    <p class="text-muted">Fecha: ${d.toLocaleString()}</p>
    <hr>
  `;
  ticket.items.forEach(it=>{
    const p = document.createElement('p');
    p.textContent = `${it.marca} x ${it.cantidad} = $${it.precio * it.cantidad}`;
    ticketEl.appendChild(p);
  });
  ticketEl.innerHTML += `<hr><h5>Total: $${ticket.total}</h5>`;
}

downloadBtn.addEventListener('click', ()=>{
  const w = window.open('', '_blank');
  w.document.write(`<html><head><title>Ticket</title><link rel="stylesheet" href="css/estilos.css"></head><body>${ticketEl.innerHTML}</body></html>`);
  w.document.close();
  w.print();
});

volver?.addEventListener('click', ()=>{
  sessionStorage.removeItem('clienteNombre');
  sessionStorage.removeItem('ultimoTicket');
  location.href = 'index.html';
});
