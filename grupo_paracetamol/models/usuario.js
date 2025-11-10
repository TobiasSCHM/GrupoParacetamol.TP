const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PATH_USUARIOS = path.join(__dirname, '..', 'archivos', 'usuarios.json');
const ITER = 100000;
const KEYLEN = 64;
const DIGEST = 'sha512';

class Usuario {
  static obtenerTodos() {
    if (!fs.existsSync(PATH_USUARIOS)) return [];
    try { return JSON.parse(fs.readFileSync(PATH_USUARIOS, 'utf8')); } catch { return []; }
  }
  static crear({ email, nombre, password }) {
    if (!email || !password) throw new Error('email y password requeridos');
    const usuarios = Usuario.obtenerTodos();
    if (usuarios.find(u => u.email === email)) throw new Error('Usuario ya existe');
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, ITER, KEYLEN, DIGEST).toString('hex');
    const id = usuarios.length ? usuarios[usuarios.length - 1].id + 1 : 1;
    const nuevoUsuario = { id, email, nombre, passwordHash: hash, salt, algoritmo: `${DIGEST}:${ITER}:${KEYLEN}` };
    usuarios.push(nuevoUsuario);
    const dir = path.dirname(PATH_USUARIOS);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(PATH_USUARIOS, JSON.stringify(usuarios, null, 2), 'utf8');
    const { passwordHash, salt: s, ...publico } = nuevoUsuario;
    return publico;
  }
}
module.exports = Usuario;
