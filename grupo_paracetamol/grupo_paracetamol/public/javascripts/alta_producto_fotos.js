window.addEventListener("load", () => {

    document.getElementById("btnForm").addEventListener("click", agregarProductoFoto);

});

async function agregarProductoFoto() {
        
    let codigo = parseInt(document.getElementById("codigo").value);
    let marca = document.getElementById("marca").value;
    let precio = parseFloat(document.getElementById("precio").value);
    let foto = document.getElementById("foto");

    let data = {
        "codigo" : codigo,
        "marca" : marca,
        "precio" : precio
    };

    let form = new FormData();
    form.append('foto', foto.files[0]);
    form.append('obj_producto', JSON.stringify(data));

    const opciones = {
        method: "POST",
        body: form,
    };

    try {

        let res = await manejadorFetch(URL_API + "productos_fotos", opciones);
    
        let resCadena = await res.text(); 
        
        console.log("Agregar: ", resCadena);
        
        window.location.href = URL_API + "productos_fotos";

    } catch (err) {
    
        fail(err);
    }
}