window.addEventListener("load", () => {
    // mostrarListadoFotos();

    document.getElementsByName("btnSeleccionar").forEach((boton)=> {

        boton.addEventListener("click", ()=> { 

            let obj= boton.getAttribute("data-obj");
            let obj_dato = JSON.parse(obj);

            window.location.href = URL_API + "productos_fotos/" + obj_dato.codigo;
        });
    });

    document.getElementsByName("btnEliminar").forEach((boton)=>{

        boton.addEventListener("click", ()=>{ 

            let codigo = boton.getAttribute("data-codigo");

            if(confirm(`¿Seguro de eliminar producto con código ${codigo}?`)){
                
                eliminarProductoFoto(codigo);
            }                
        });
    });

    document.getElementById("btnAgregarProducto").addEventListener("click", ()=>{
        window.location.href = URL_API + "productos_fotos/nuevo";
    })

});
async function eliminarProductoFoto(codigo) {

    let data = `{"codigo": ${codigo}}`;

    const opciones = {
        method: "DELETE",
        body: data,
        headers: {"Accept": "*/*", "Content-Type": "application/json"},
    };

    try {

        let res = await manejadorFetch(URL_API + "productos_fotos", opciones);
    
        let resCadena = await res.text(); 
        
        console.log("Eliminar: ", resCadena);

        //success();
        window.location.href = URL_API + "productos_fotos";

    } catch (err) {
    
        fail(err);
    }
}


function fail(retorno) {
    console.error(retorno);
    alert("Ha ocurrido un ERROR!!!");
}

function success() {
    mostrarListadoFotos();
}