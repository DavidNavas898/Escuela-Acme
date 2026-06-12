let usuarioDB = []
const botonFormulario = document.getElementById("main-container-bottom-form")




function crearUsuario(){

    const id = document.getElementById("cedula").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;
    const cargo = document.getElementById("cargo").value;
    const password = document.getElementById("password").value;
    const limpiar = document.getElementById("limpiar");

    if(!validarFormulario()){
        return;
    }

     if(!camposRepetidos()){
        return;
    }

    const usuario = {
        id,
        name,
        email,
        telefono,
        cargo,
        password
    };

    usuarioDB.push(usuario);
 
    
    const resultado = document.getElementById("resultado");
    const tarjeta = document.createElement("div");
    const divBotones = document.createElement("div")

    const identificacion = document.createElement("h6");
    identificacion.textContent = `Cédula: ${id}`;

    const nombre = document.createElement("h6");
    nombre.textContent = `Nombre: ${name}`;

    const correo = document.createElement("h6");
    correo.textContent = `Correo: ${email}`;

    const tel = document.createElement("h6");
    tel.textContent = `Teléfono: ${telefono}`;

    const cargoTitulo = document.createElement("h6");
    cargoTitulo.textContent = `Cargo: ${cargo}`;

    const editar = document.createElement("button")
    editar.textContent = "Editar"
    editar.classList.add("edit")
    editar.addEventListener("click",() =>{
        editarUsuario(tarjeta,usuario);
    })
    
    const eliminar = document.createElement("button")
    eliminar.textContent = "Eliminar"
    eliminar.classList.add("delete")
    eliminar.addEventListener("click", ()=>{
        eliminarUsuario(tarjeta,id)
    })

   
 
    
    divBotones.append(editar,eliminar)
    divBotones.classList.add("botones")
    tarjeta.append(identificacion,nombre,correo,tel,cargoTitulo,divBotones);


    
    tarjeta.classList.add("tarjeta-usuario")

    resultado.append(tarjeta);

    const usuarios = document.querySelectorAll(".tarjeta-usuario");
    document.querySelector(".users-top p").textContent = `${usuarios.length} registros`;

}

function validarFormulario(){
    const campos = [
        {input: document.getElementById("cedula"), error: document.getElementById("error-cedula"), mensaje: "*La cedula es obligatoria"},
        {input: document.getElementById("name"), error: document.getElementById("error-name"), mensaje: "*El nombre es obligatorio"},
        {input: document.getElementById("email"), error: document.getElementById("error-email"), mensaje: "*El email es obligatorio"},
        {input: document.getElementById("telefono"), error: document.getElementById("error-telefono"), mensaje: "*El telefono es obligatorio"},
        {input: document.getElementById("password"), error: document.getElementById("error-password"), mensaje: "*La contraseña es obligatoria"},
    ]

    let valido = true;

    campos.forEach(p =>{
        if(!p.input.value.trim()){
            p.input.classList.add("inputError");
            p.error.textContent = p.mensaje;
            valido = false
        }else{
            p.input.classList.remove("inputError")
            p.error.textContent = ""
        }
    })

    return valido;



}

function camposRepetidos(){
    const cedula = document.getElementById("cedula")
    const errorCedula = document.getElementById("error-cedula")

    const existe = usuarioDB.some(usuario => usuario.id === cedula.value);

    if(existe){
        cedula.classList.add("inputError");
        errorCedula.textContent = "La cedula ya existe"
        return false;
    }

    cedula.classList.remove("inputError")
    errorCedula.textContent = "";
    return true;
}

function eliminarUsuario(tarjeta,id){
    tarjeta.remove()

    usuarioDB = usuarioDB.filter(usuario => usuario.id != id);

    document.querySelector(".users-top p").textContent = `${usuarioDB.length} registros`;
}

function editarUsuario(tarjeta,usuario){
    document.getElementById("cedula").value = usuario.id;
    document.getElementById("name").value = usuario.name; 
    document.getElementById("email").value = usuario.email;
    document.getElementById("telefono").value = usuario.telefono;
    document.getElementById("password").value = usuario.password;

    botonActualizar = document.createElement("div");
    botonActualizar.classList.add("azul");
    botonActualizar.textContent = "Actualizar";


    botonCrear = document.getElementById("crear");
    botonCrear.classList.add("esconder");

    botonLimpiar = document.getElementById("limpiar");
    botonLimpiar.setAttribute("onclick", "locationReload()");
    botonLimpiar.textContent = "Cancelar Edicion"

    botonFormulario.append(botonActualizar);

    

    
    
}

function limpiarFormulario(usuario){
    document.getElementById("cedula").value = "";
    document.getElementById("name").value = ""; 
    document.getElementById("email").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("password").value = "";
}

function locationReload(){
    location.reload();
}