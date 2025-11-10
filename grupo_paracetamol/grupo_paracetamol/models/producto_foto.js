
const PATH_ARCHIVO_FOTO = "./archivos/productos_fotos.json";

const fs = require('fs');
const mime = require('mime-types');

class ProductoFoto {


    static async obtenerTodos() { 

        let retorno = {};

        if(fs.existsSync(PATH_ARCHIVO_FOTO)){

            const data = fs.readFileSync(PATH_ARCHIVO_FOTO);
            retorno = JSON.parse(data);
        }

        return retorno;
    }

    static async agregar(obj_producto, file) {

        let rta = true;

        try {

            let extension = mime.extension(file.mimetype);
            let path = file.destination + obj_producto.codigo + "." + extension;

            obj_producto.path = path.split("public/")[1];

            fs.renameSync(file.path, path);

            if(fs.existsSync(PATH_ARCHIVO_FOTO)){

                const data = JSON.parse(fs.readFileSync(PATH_ARCHIVO_FOTO));
                
                data.push(obj_producto);

                fs.writeFileSync(PATH_ARCHIVO_FOTO, JSON.stringify(data, null, 2));
            }
            else {
                rta = false;
            }
        }
        catch(err){
            rta = false;
        }

        return rta;
    }
   
    static async modificar(obj_producto, file) {

        let rta = true;

        try {

            let extension = mime.extension(file.mimetype);
            let path = file.destination + obj_producto.codigo + "." + extension;

            obj_producto.path = path.split("public/")[1];

            fs.renameSync(file.path, path);

            if(fs.existsSync(PATH_ARCHIVO_FOTO)){

                const data = JSON.parse(fs.readFileSync(PATH_ARCHIVO_FOTO));
                
                const indice = data.findIndex(p => parseInt(p.codigo) === parseInt(obj_producto.codigo));

                if(indice === -1) {
                    rta = false;
                }
                else {

                    data[indice] = obj_producto;

                    fs.writeFileSync(PATH_ARCHIVO_FOTO, JSON.stringify(data, null, 2));
                }               
            }
            else {
                rta = false;
            }
        }
        catch(err){
            rta = false;
        }

        return rta;
    }

    static async eliminar(obj_producto) {

        let rta = true;

        try {

            if(fs.existsSync(PATH_ARCHIVO_FOTO)){

                let data = JSON.parse(fs.readFileSync(PATH_ARCHIVO_FOTO));
                
                const indice = data.findIndex(p => parseInt(p.codigo) === parseInt(obj_producto.codigo));

                if(indice === -1) {
                    rta = false;
                }
                else {

                    const obj_delete = data[indice];

                    data = data.filter(p => parseInt(p.codigo) !== parseInt(obj_delete.codigo));

                    fs.writeFileSync(PATH_ARCHIVO_FOTO, JSON.stringify(data, null, 2));

                    let path_foto = "public/" + obj_delete.path;

                    fs.unlink(path_foto, (err) => {
                        if (err) throw err;
                    });
                }               
            }
            else {
                rta = false;
            }
        }
        catch(err){console.log(err.message);
            rta = false;
        }

        return rta;
    }

    static async obtenerUno(codigo) { 

        let retorno = {};

        if(fs.existsSync(PATH_ARCHIVO_FOTO)){

            const data = JSON.parse(fs.readFileSync(PATH_ARCHIVO_FOTO));
            const indice = data.findIndex(p => parseInt(p.codigo) === parseInt(codigo));

            if(indice !== -1) {
                
                retorno = data[indice];
            }
          
        }

        return retorno;
    }
}


module.exports = ProductoFoto;