let usuarioDB = []





function crearUsuario(){

    const id = document.getElementById("cedula").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;
    const cargo = document.getElementById("cargo").value;
    const password = document.getElementById("password").value;

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
    
    const eliminar = document.createElement("button")
    eliminar.textContent = "Eliminar"
    eliminar.classList.add("delete")

 
    
    divBotones.append(editar,eliminar)
    divBotones.classList.add("botones")
    tarjeta.append(identificacion,nombre,correo,tel,cargoTitulo,divBotones);
    
    tarjeta.classList.add("tarjeta-usuario")

    resultado.append(tarjeta);

    const usuarios = document.querySelectorAll(".tarjeta-usuario");
    document.querySelector(".users-top p").textContent = `${usuarios.length} registros`;

}

