
const ProductoFoto = require("../models/producto_foto");


const getPhotoController = async (request, response)=>{

    const productos = await ProductoFoto.obtenerTodos();
    const scripts = [{src:"../javascripts/varios.js"}, {src:"../javascripts/productos_fotos.js"}];

    response.render("listadoProductos", {scripts: scripts, titulo:"Listado de Productos", prod_obj_array : productos});
};

const getNewPhotoController = async (request, response)=>{

    const scripts = [{src:"../javascripts/varios.js"}, {src:"../javascripts/alta_producto_fotos.js"}];
    const un_producto = null;
    
    response.render("formProducto", {scripts: scripts, titulo:"Agregar producto", un_producto});
};

const getOnePhotoController = async (request, response)=>{

    const codigo = request.params.codigo;
    const producto = await ProductoFoto.obtenerUno(codigo);

    const scripts = [{src:"../javascripts/varios.js"}, {src:"../javascripts/modificar_producto_fotos.js"}];

    response.render("formProducto", {scripts: scripts, titulo:"Modificar producto", un_producto : producto});
};

const postPhotoController = async (request, response)=>{

    let estado = 200;
    const obj_resp = {"exito":false, "mensaje":"No se pudo agregar."};

    try {

        const file = request.file;
        const obj = JSON.parse(request.body.obj_producto);
        
        if(await ProductoFoto.agregar(obj, file)) {
            estado = 201;
            obj_resp.exito = true;
            obj_resp.mensaje = "Producto con foto agregado."
        }

    } catch (err) {
        estado = 500;
        obj_resp.mensaje += err.message;
    }
    finally{
        response.status(estado).json(obj_resp);
    }
}

const putPhotoController = async (request, response)=>{

    let estado = 200;
    const obj_resp = {"exito":false, "mensaje":"No se pudo modificar."};

    try {

        const file = request.file;
        const obj = JSON.parse(request.body.obj_producto);

        if(await ProductoFoto.modificar(obj, file)) {
            estado = 201;
            obj_resp.exito = true;
            obj_resp.mensaje = "Producto con foto modificado."
        }

    } catch (err) {
        estado = 500;
        obj_resp.mensaje += err.message;
    }
    finally{
        response.status(estado).json(obj_resp);
    }
};

const deletePhotoController = async (request, response)=>{

    let estado = 200;
    const obj_resp = {"exito":false, "mensaje":"No se pudo eliminar."};

    try {

        const obj = { ...request.body };
        
        if(await ProductoFoto.eliminar(obj)) {

            estado = 201;
            obj_resp.exito = true;
            obj_resp.mensaje = "Producto con foto eliminado."
        }

    } catch (err) {
        estado = 500;
        obj_resp.mensaje += err.message;
    }
    finally{
        response.status(estado).json(obj_resp);
    }
}


module.exports = {getPhotoController, postPhotoController, putPhotoController, deletePhotoController, getNewPhotoController, getOnePhotoController}