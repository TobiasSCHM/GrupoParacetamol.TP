import { loginAdmin } from './api.js';

const form = document.getElementById('loginForm');
const quick = document.getElementById('quickAdmin');
const emailInput = document.getElementById('email');
const passInput = document.getElementById('password');

// acceso rápido corregido
quick.addEventListener('click', async () => {
  emailInput.value = 'admin@admin';
  passInput.value = '1234';
  try {
    const res = await loginAdmin(emailInput.value, passInput.value);
    sessionStorage.setItem('adminToken', res.token);
    location.href = 'dashboard.html';
  } catch (err) {
    alert('Error en el acceso rápido');
  }
});

// login manual
form.addEventListener('submit', async e => {
  e.preventDefault();
  try {
    const res = await loginAdmin(emailInput.value, passInput.value);
    sessionStorage.setItem('adminToken', res.token);
    location.href = 'dashboard.html';
  } catch (err) {
    alert('Credenciales inválidas');
  }
});
