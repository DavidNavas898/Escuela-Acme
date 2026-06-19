(function verificarSesion(){
    const sesion = JSON.parse(sessionStorage.getItem('sesionActiva')) || null;
    if (!sesion || !sesion.logueado) {
        window.location.href = 'login.html';
    }
})();

let usuarioDB = JSON.parse(localStorage.getItem("usuarios")) || [];
const botonFormulario = document.getElementById("main-container-bottom-form")




function crearUsuario(){

    if(!validarFormulario()){
        return;
    }

     if(!camposRepetidos()){
        return;
    }

    const usuario = {
        id: document.getElementById("cedula").value,
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        telefono: document.getElementById("telefono").value,
        cargo: document.getElementById("cargo").value,
        password: document.getElementById("password").value
    };

    usuarioDB.push(usuario);
    guardarUsuarios();
    mostrarTarjeta(usuario)
 
    document.querySelector(".users-top p").textContent = `${usuarioDB.length} registros`;

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
            valido = false;
        }else{
            p.input.classList.remove("inputError");
            p.error.textContent = "";
        }
    });

    const password = document.getElementById("password");
    const errorPassword = document.getElementById("error-password");

    if(password.value.length < 8){
        password.classList.add("inputError");
        errorPassword.textContent =
        "*La contraseña debe tener mínimo 8 caracteres";
        valido = false;
    }

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
    if(!confirm("¿Seguro que deseas eliminar este usuario?")) return;

    tarjeta.remove()

    usuarioDB = usuarioDB.filter(usuario => usuario.id != id);
    guardarUsuarios();

    document.querySelector(".users-top p").textContent = `${usuarioDB.length} registros`;
}

function editarUsuario(tarjeta,usuario){
    
    document.getElementById("cedula").value = usuario.id;
    document.getElementById("name").value = usuario.name; 
    document.getElementById("email").value = usuario.email;
    document.getElementById("telefono").value = usuario.telefono;
    document.getElementById("password").value = usuario.password;
    document.getElementById("cargo").value = usuario.cargo;

    const botonActualizar = document.createElement("button");
    botonActualizar.classList.add("azul");
    botonActualizar.textContent = "Actualizar";

    const botonCrear = document.getElementById("crear");
    botonCrear.classList.add("esconder");

    const botonLimpiar = document.getElementById("limpiar");
    botonLimpiar.setAttribute("onclick", "locationReload()");
    botonLimpiar.textContent = "Cancelar Edicion"

    const botonActualizarExistente = botonFormulario.querySelector(".azul");
    if(botonActualizarExistente) botonActualizarExistente.remove();

    botonFormulario.append(botonActualizar);

    botonActualizar.addEventListener("click", ()=>{
         if(!validarFormulario()){
        return;
        }

        let nuevoNombre = document.getElementById("name").value;
        let nuevoEmail = document.getElementById("email").value;
        let nuevoTelefono = document.getElementById("telefono").value;
        let nuevoCargo = document.getElementById("cargo").value;

        usuario.name = nuevoNombre;
        usuario.email = nuevoEmail;
        usuario.telefono = nuevoTelefono;
        usuario.cargo = nuevoCargo;

        guardarUsuarios();

        let campos = tarjeta.querySelectorAll("h6");
        campos[1].textContent = "Nombre: "+ nuevoNombre;
        campos[2].textContent = "Correo: "+ nuevoEmail;
        campos[3].textContent = "Teléfono: "+ nuevoTelefono;

        const badgeExistente = campos[4].querySelector(".badge");
        if(badgeExistente){
            badgeExistente.textContent = nuevoCargo.charAt(0).toUpperCase() + nuevoCargo.slice(1);
            badgeExistente.className = `badge badge-${nuevoCargo}`;
        }

    });
}

function limpiarFormulario(){
    document.getElementById("cedula").value = "";
    document.getElementById("name").value = ""; 
    document.getElementById("email").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("password").value = "";
    document.getElementById("cargo").value = "administrativo";
    document.querySelectorAll(".inputError").forEach(el => el.classList.remove("inputError"));
    document.querySelectorAll(".error").forEach(el => el.textContent = "");
}

function locationReload(){
    location.reload();
}

function mostrarTarjeta(usuario){
    const resultado = document.getElementById("resultado");
    const tarjeta = document.createElement("div");
    const divBotones = document.createElement("div")

    const identificacion = document.createElement("h6");
    identificacion.textContent = `Cédula: ${usuario.id}`;

    const nombre = document.createElement("h6");
    nombre.textContent = `Nombre: ${usuario.name}`;

    const correo = document.createElement("h6");
    correo.textContent = `Correo: ${usuario.email}`;

    const tel = document.createElement("h6");
    tel.textContent = `Teléfono: ${usuario.telefono}`;

    const cargoTitulo = document.createElement("h6");
    const badge = document.createElement("span");
    badge.textContent = usuario.cargo.charAt(0).toUpperCase() + usuario.cargo.slice(1);
    badge.classList.add("badge", `badge-${usuario.cargo}`);
    cargoTitulo.textContent = "Cargo: ";
    cargoTitulo.appendChild(badge);

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
        eliminarUsuario(tarjeta,usuario.id)
    })

   
 
    
    divBotones.append(editar,eliminar)
    divBotones.classList.add("botones")
    tarjeta.append(identificacion,nombre,correo,tel,cargoTitulo,divBotones);


    
    tarjeta.classList.add("tarjeta-usuario")

    resultado.append(tarjeta);
}

function guardarUsuarios() {
    localStorage.setItem("usuarios", JSON.stringify(usuarioDB));
}

usuarioDB.forEach(usuario => {
    mostrarTarjeta(usuario);
});

function cerrarSesion(){
    sessionStorage.removeItem("sesionActiva")
    window.location.href = ("/login.html")
}

document.querySelector(".users-top p").textContent =
`${usuarioDB.length} registros`;

