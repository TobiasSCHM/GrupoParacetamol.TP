const fs = require('fs');
const path = require('path');
const PATH_VENTAS = path.join(__dirname, '..', 'archivos', 'ventas.json');

class Venta {
  static obtenerTodas() {
    if (!fs.existsSync(PATH_VENTAS)) return [];
    const data = fs.readFileSync(PATH_VENTAS, 'utf8');
    try { return JSON.parse(data); } catch { return []; }
  }
  static guardar(ventaObj) {
    const ventas = Venta.obtenerTodas();
    const ultimoId = ventas.length ? ventas[ventas.length - 1].id || 0 : 0;
    const nuevaVenta = { ...ventaObj, id: ultimoId + 1 };
    const dir = path.dirname(PATH_VENTAS);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(PATH_VENTAS, JSON.stringify([...ventas, nuevaVenta], null, 2), 'utf8');
    return nuevaVenta;
  }
}
module.exports = Venta;
