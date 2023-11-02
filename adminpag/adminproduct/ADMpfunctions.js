// se crean los contenedores de los elementos html
let inicio = document.getElementById("Logo-tienda");
let nuevologin = document.getElementById('Bingresar');
let btonProductos = document.getElementById("lm-bton-productos");
let btonOfertas = document.getElementById("lm-bton-ofertas");
// inicio funcionalidad de botones de  navegacion del Admin.
inicio.addEventListener("click", function () {
    let campousuario = document.getElementById("labelusuario");
    if (sessionStorage.getItem("autosave")) {
        campousuario.innerHTML = sessionStorage.getItem("autosave");
    }
    campousuario.addEventListener("change", () => {
        sessionStorage.setItem("autosave", campousuario.innerHTML);
    })
    window.location.href = "http://localhost/Neutro/codigo/adminpag/ADindex.html";
});

btonProductos.addEventListener("click", function () {
    window.location.href = "ADMpindex.html#controlador-productos";
});

//--------------------- funcionalidad de seccion productos---------------\\.

//----funcion para editar en formulario--//.
function validar_Edicion_producto(nombre,Caracteristicas,imagen,Estado,Categoria){
    if(nombre === "" && Caracteristicas ===""){
        //revisa si los campos estan vacios
    }
    //verificar si es solo texto,
    //verificar si esta todo en miniscula(eceptuando url imagen);
    // "" si la categoria esta seleccionada y no tiene valor "0".



};//validaciones para la edicion de un producto.
//fin validaciones//

function traerCategorias(idselect){
    let selectId = document.getElementById(idselect);
    fetch("http://localhost/Neutro/codigo/php/phpadmin/traerCategorias.php")
    .then(function(response){
        if(response.ok){
            return response.json();
        }
    }).then(function(data){
        // console.log(data);
        for(let i=0;i<data.categorias.length;i++){
            let option = document.createElement("option");
            option.value= data.categorias[i].id;
            option.text = data.categorias[i].Nombre;
            selectId.appendChild(option);
        }
    }).catch(function(error){
        console.log("error al cargar las categorias:",error);
    });
};
function EditarProducto(Editar_idproduct, Editar_imgurl, Editar_caract, Editar_precio, Editar_nombre, Editar_idstock, Editar_estado,Editar_Categoria) {
    var input_id = document.getElementById("prcto-in-id");
    input_id.value = Editar_idproduct;
    var input_nombre = document.getElementById("prcto-in-nombre");
    input_nombre.value = Editar_nombre;
    var input_caract = document.getElementById("prcto-in-crtcs");
    input_caract.value = Editar_caract;
    var input_imgurl = document.getElementById("prcto-in-img");
    input_imgurl.value = Editar_imgurl;
    var input_Estado = document.getElementById("prcto-in-Estado");
    input_Estado.value = Editar_estado;
    var input_Categoria = document.getElementById("prcto-in-Categoria");
    
    input_Categoria.value = Editar_Categoria;
    

};

let formulario_productos = document.getElementById("form-prcto");
formulario_productos.addEventListener("submit",e=>{
    e.preventDefault();
    let nombre = document.getElementById("prcto-in-id").value;
    document.getElementById("prcto-in-nombre").innerHTML = nombre;
    let Caracteristicas = document.getElementById("prcto-in-crtcs").value;
    document.getElementById("prcto-in-crtcs").innerHTML = Caracteristicas;
    let imagen = document.getElementById("prcto-in-img").value;
    document.getElementById("prcto-in-img").innerHTML = imagen;
    let Estado = document.getElementById("prcto-in-Estado").value;
    document.getElementById("prcto-in-Estado").innerHTML = Estado;
    let Categoria = document.getElementById("prcto-in-Categoria").value;
    document.getElementById("prcto-in-Categoria").innerHTML = Categoria;

    validar_Edicion_producto(nombre,Caracteristicas,imagen,Estado,Categoria);

});

//----fin funcion----//
//----funcion para dar de baja producto--//
function Dardebaja() { 
    //aqui envia directamente a la pagina Baja a modo de verificacion por click accidental.
};

function traerproductos() {
    fetch("http://localhost/Neutro/codigo/php/phpadmin/httpProducto.php")
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                console.log('Error: ' + response.status);
            }
        })
        .then(function (data) {
            // console.log(data);
            var contenedor_productos = document.getElementById("contenedor-productos");
            // contenedor_productos.style.overflow = 'auto';
            // contenedor_productos.style.height = '20em';
            var columnas = [ "nro","imagen", "id Producto","Nombre","estado", "Caracteristicas", "Precio","id stock","categoria","Acciones"];
            var tablaproductos = document.createElement("table");
            var thead = document.createElement('thead');
            var tr = document.createElement('tr');
            for (var e = 0; e < columnas.length; e++) {
                var th = document.createElement('th');
                var texto = document.createTextNode(columnas[e]);
                th.appendChild(texto);
                tr.appendChild(th);
                thead.appendChild(tr);
                tablaproductos.appendChild(thead);
            }
            var tbody = document.createElement('tbody');
            for (var i = 0; i < data.productos.length; i++) {
                var tr_body = document.createElement('tr');
                var td_id = document.createElement('td');
                td_id.className="td-producto";
                var td_img= document.createElement('td');
                td_img.className="td-producto";
                var td_productoId = document.createElement('td');
                td_productoId.className="td-producto";
                var td_nombre = document.createElement('td');
                td_nombre.className="td-producto";
                var td_estado = document.createElement('td');
                td_estado.className="td-producto";
                var td_caract = document.createElement('td');
                td_caract.className="td-producto";
                var td_precio = document.createElement('td');
                td_precio.className="td-producto";
                var td_stockId = document.createElement('td');
                td_stockId.className="td-producto";
                var td_categoria = document.createElement('td');
                td_categoria.className="td-producto";
                var td_acciones = document.createElement('td');
                td_acciones.className="td-producto";

                var idproducto = document.createElement('p');
                var productoID = document.createElement('h1');
                var imgurl = document.createElement('p');
                imgurl.className = "producto-imgurl";
                var Caract = document.createElement('p');
                Caract.className = "producto-Caract";
                var Precio = document.createElement('p');
                Precio.className = "producto-precio";
                var nombre = document.createElement('p');
                nombre.className = "producto-nombres";
                var id_stock = document.createElement('p');
                id_stock.className = "producto-id_stock";
                var estado = document.createElement('p');
                estado.className = "producto-estado";
                var Categoria = document.createElement('p');
                Categoria.className = "producto-Categoria";
                var img = document.createElement('img');
                
                idproducto.innerText = data.productos[i].Id;
                productoID.innerText = data.productos[i].id_producto;
                Caract.innerText = data.productos[i].Caracteristicas;
                Precio.innerText = data.productos[i].Costo;
                nombre.innerText = data.productos[i].Nombre;
                id_stock.innerText = data.productos[i].id_stock;
                estado.innerText = data.productos[i].Estado;
                img.src = data.productos[i].imagen;
                img.alt = "no se encontro imagen";
                imgurl = data.productos[i].imagen;
                Categoria.innerText = data.productos[i].Categoria;
                img.height = 70;
                img.width = 90;
                

                var bton_editar = document.createElement('button');
                bton_editar.textContent = "EDITAR";
                bton_editar.className = "products_bton";
                bton_editar.onclick = function () {
                    var Editar_productoID = this.parentNode.parentNode.querySelector("h1").innerText;
                    var Editar_imgurl = this.parentNode.parentNode.querySelector("img").src;
                    var Editar_caract = this.parentNode.parentNode.querySelector("p.producto-Caract").innerText;
                    var Editar_precio = this.parentNode.parentNode.querySelector("p.producto-precio").innerText;
                    var Editar_nombre = this.parentNode.parentNode.querySelector("p.producto-nombres").innerText;
                    var Editar_idstock = this.parentNode.parentNode.querySelector("p.producto-id_stock").innerText;
                    var Editar_estado = this.parentNode.parentNode.querySelector("p.producto-estado").innerText;
                    var Editar_Categoria = this.parentNode.parentNode.querySelector("p.producto-Categoria").innerText;
                    console.log("id del producto: " + Editar_productoID);
                    console.log("precio del producto: " + Editar_precio);
                    console.log("categoria del producto"+Editar_Categoria);
                    EditarProducto(Editar_productoID,Editar_imgurl,Editar_caract,Editar_precio,Editar_nombre,Editar_idstock,Editar_estado,Editar_Categoria);
                };
                var bton_Baja = document.createElement('button');
                bton_Baja.textContent = "DAR BAJA";
                bton_Baja.className = "products_bton";
                bton_Baja.onclick = function () {
                    var nom = this.parentNode.parentNode.querySelector("h1").innerText;
                    console.log("id del producto: " + nom);
                    EditarProducto(nom);
                };

                td_id.appendChild(idproducto);
                td_img.appendChild(img);
                td_productoId.appendChild(productoID);
                td_nombre.appendChild(nombre);
                td_estado.appendChild(estado);
                td_caract.appendChild(Caract);
                td_precio.appendChild(Precio);
                td_stockId.appendChild(id_stock);
                td_categoria.appendChild(Categoria);
                td_acciones.appendChild(bton_editar);
                td_acciones.appendChild(bton_Baja);

                tr_body.appendChild(td_id);
                tr_body.appendChild(td_img);
                tr_body.appendChild(td_productoId);
                tr_body.appendChild(td_nombre);
                tr_body.appendChild(td_estado);
                tr_body.appendChild(td_caract);
                tr_body.appendChild(td_precio);
                tr_body.appendChild(td_stockId);
                tr_body.appendChild(td_categoria);
                tr_body.appendChild(td_acciones);

                tbody.appendChild(tr_body);

                tablaproductos.appendChild(tbody);


                //creamos cada elemento de la tabla

                
                //ingresamos los datos en los elementos;//
        
            }
            contenedor_productos.appendChild(tablaproductos);
        });
}
//---------------------fin funcionalidad producto-----------------//
//----------------funcionalidad ofertas----------------------//.
function traerOfertas() {
    fetch("http://localhost/Neutro/codigo/php/phpadmin/httpOfertas.php")
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                console.log('Error: ' + response.status);
            }
        })
        .then(function (data) {
            // console.log(data);
            let contenedor = document.getElementById("contenedor_ofertas");
            var columnas = ["Id", "Producto", "Precio", "Oferta", "Acciones"];
            var tabla = document.createElement("table");
            var thead = document.createElement('thead');
            var tr = document.createElement('tr');
            for (var e = 0; e < columnas.length; e++) {
                var th = document.createElement('th');
                var texto = document.createTextNode(columnas[e]);
                th.appendChild(texto);
                tr.appendChild(th);
                thead.appendChild(tr);
                tabla.appendChild(thead);
            }
            var tbody = document.createElement('tbody');
            for (var i = 0; i < data.ofertas.length; i++) {
                var tr_body = document.createElement('tr');
                var td_id = document.createElement('td');
                var td_nombreproducto = document.createElement('td');
                var td_precioanterior = document.createElement('td');
                var td_Oferta = document.createElement('td');
                var td_acciones = document.createElement('td');
                var bton_oferta_editar = document.createElement('button');
                var bton_oferta_bajar = document.createElement('button');

                var p_id = document.createElement('p');
                p_id.className="oferta_id";
                var p_nombre = document.createElement('p');
                p_nombre.className="oferta_nombre";
                var p_precioA = document.createElement('p');
                p_precioA.className="oferta_precioA";
                var p_Oferta = document.createElement('p');
                p_Oferta.className="oferta_pOferta";

                p_id.innerText=data.ofertas[i].Id_Oferta;
                p_nombre.innerText=data.ofertas[i].nombreProducto;
                p_precioA.innerText = data.ofertas[i].PrecioAnterior;
                p_Oferta.innerText = data.ofertas[i].PrecioActual;

                bton_oferta_editar.innerText="EDITAR";
                bton_oferta_editar.className="bton_ofertas";
                bton_oferta_editar.onclick=function(){
                    var id = this.parentNode.parentNode.querySelector("p.oferta_id").innerText;
                    var nombreproducto = this.parentNode.parentNode.querySelector("p.oferta_nombre").innerText;
                    var precioAnterior = this.parentNode.parentNode.querySelector("p.oferta_precioA").innerText;
                    var precioOferta = this.parentNode.parentNode.querySelector("p.oferta_pOferta").innerText;
                    
                    // console.log("id oferta:"+id);
                    // console.log("nombre oferta:"+nombreproducto);
                    // console.log("precio anterior oferta:"+precioAnterior);
                    // console.log("precio actual oferta:"+precioOferta);
                    editarOferta(id,nombreproducto,precioAnterior,precioOferta);
                };

                bton_oferta_bajar.innerText="ELIMINAR";
                bton_oferta_bajar.className="bton_ofertas";
                bton_oferta_bajar.onclick=function(){
                };
                //ingresamos los datos dentro de los td.
                td_id.appendChild(p_id);
                td_nombreproducto.appendChild(p_nombre);
                td_precioanterior.appendChild(p_precioA);
                td_Oferta.appendChild(p_Oferta);
                td_acciones.appendChild(bton_oferta_editar);
                td_acciones.appendChild(bton_oferta_bajar);
                //ingresamos los td en el tr.
                tr_body.appendChild(td_id);
                tr_body.appendChild(td_nombreproducto);
                tr_body.appendChild(td_precioanterior);
                tr_body.appendChild(td_Oferta);
                tr_body.appendChild(td_acciones);
                //ingresamos el tr dentro del tbodu
                tbody.appendChild(tr_body);


                tabla.appendChild(tbody);      

            }
            contenedor.appendChild(tabla);
        });
};
function editarOferta(id,nombreproducto,precioAnterior,precioOferta) {
    var input_oferta_id = document.getElementById("form-ofert-input-id");
    var input_oferta_nombre = document.getElementById("form-ofert-input-nombre");
    var input_oferta_precioA = document.getElementById("form-ofert-input-precioA");
    var input_oferta_precioB = document.getElementById("form-ofert-input-precioB");

    input_oferta_id.value = id;
    input_oferta_nombre.value = nombreproducto;
    input_oferta_precioA.value = precioAnterior;
    input_oferta_precioB.value = precioOferta;
}
//---------seccion Domload-------------//.
window.addEventListener('DOMContentLoaded', function () {
    traerproductos();
    traerOfertas();
    let idselect = "prcto-in-Categoria";
    traerCategorias(idselect);
})