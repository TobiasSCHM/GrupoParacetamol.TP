// Controlador de tema (claro / oscuro)
(function () {
  const btns = document.querySelectorAll('#themeToggle');
  const stored = localStorage.getItem('theme');
  if (stored === 'dark') document.body.classList.add('dark');

  const applyIcon = () => {
    btns.forEach(b => {
      b.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
      b.title = 'Cambiar tema';
    });
  };

  const toggle = () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    applyIcon();
  };

  btns.forEach(b => b.addEventListener('click', toggle));
  applyIcon();
})();
