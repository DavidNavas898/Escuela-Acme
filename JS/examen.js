
let examenesDB = JSON.parse(localStorage.getItem("examenes")) || [];
let contadorPreguntas = 1;
examenesDB.forEach(examen => mostrarTarjeta(examen));
let codigoEditando = null;


function crearExamen(){
    let bancoPreguntas = []

    const preguntas = document.querySelectorAll(
    ".main-container-questions-card"
    );

    if (preguntas.length < 1) {
        alert("El examen debe tener al menos una preguntas.");
        return;
    }

    if(!validarExamen()){
        return;
    }

    if (!validarRespuestas()) {
    return;
}

    if(!validarCheckbox()){
        return;
    }

    if(!validarInputs()){
        return;
    }

    if(!camposRepetidos()){
        return;
    }

    document.querySelectorAll(".main-container-questions-card").forEach(tarjeta => {

        const textoPregunta =
            tarjeta.querySelector(".pregunta-text").value;

        let respuestas = [];

        tarjeta.querySelectorAll(
            ".main-container-questions-card-options"
        ).forEach(opcion => {

            respuestas.push({
                texto: opcion.querySelector(".check-text").value,
                correcta: opcion.querySelector(".check-question").checked
            });

        });

        bancoPreguntas.push({
            texto: textoPregunta,
            respuestas: respuestas
        });

    });


     const examen = {
        codigo: document.getElementById("codigo").value,
        titulo: document.getElementById("titulo").value,
        tiempo: document.getElementById("tiempo").value,
        porcentaje: document.getElementById("porcentaje").value,
        descripcion: document.getElementById("descripcion").value,
        preguntas: bancoPreguntas,
    };

    examenesDB.push(examen);
    guardarExamen();
    localStorage.setItem("examenes",JSON.stringify(examenesDB));
    mostrarTarjeta(examen)

}



function validarExamen(){
    const campos = [
        {input: document.getElementById("codigo"), error: document.getElementById("error-codigo"), mensaje: "*El codigo del examen es obligatorio"},
        {input: document.getElementById("titulo"), error: document.getElementById("error-titulo"), mensaje: "*El titulo del examen es obligatorio"},
        {input: document.getElementById("tiempo"), error: document.getElementById("error-tiempo"), mensaje: "*El tiempo para el examen es obligatorio"},
        {input: document.getElementById("porcentaje"), error: document.getElementById("error-porcentaje"), mensaje: "*El porcentaje es obligatorio"},
        {input: document.getElementById("descripcion"), error: document.getElementById("error-descripcion"), mensaje: "*La descripcion es obligatoria"},
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

    const porcentaje = Number(document.getElementById("porcentaje").value);

    if(porcentaje < 0 || porcentaje > 100){
        document.getElementById("error-porcentaje").textContent ="El porcentaje debe estar entre 0 y 100";
        valido = false;
    }

    const tiempo = Number(
        document.getElementById("tiempo").value
    );

    if(tiempo <= 0){
        document.getElementById("error-tiempo").textContent ="El tiempo debe ser mayor a 0";
        valido = false;
    }

    return valido;
}

function limpiarFormulario(){
    document.getElementById("codigo").value = "";
    document.getElementById("titulo").value = ""; 
    document.getElementById("tiempo").value = "";
    document.getElementById("porcentaje").value = "";
    document.getElementById("descripcion").value = "";
    
    document.querySelectorAll(".pregunta-text").forEach(input => {
        input.value = "";
    });

    document.querySelectorAll(".check-text").forEach(input => {
        input.value = "";
    });

    document.querySelectorAll(".check-question").forEach(check => {
        check.checked = false;
    });

    document.getElementById("contenedor-preguntas").innerHTML = "";

    contadorPreguntas = 1;
}

function camposRepetidos(){
    const codigo = document.getElementById("codigo")
    const errorCodigo = document.getElementById("error-codigo")

    const existe = examenesDB.some(e => e.codigo === codigo.value);

    if(existe){
        codigo.classList.add("inputError");
        errorCodigo.textContent = "El codigo del examen ya existe"
        return false;
    }

    codigo.classList.remove("inputError")
    errorCodigo.textContent = "";
    return true;
}

function mostrarTarjeta(examen){
    const examenes = document.getElementById("examenes");
    const tarjeta = document.createElement("div");
    const divBotones = document.createElement("div")

    const codigo = document.createElement("h6");
    codigo.textContent = `Codigo: ${examen.codigo}`;

    const titulo = document.createElement("h6");
    titulo.textContent = `Titulo: ${examen.titulo}`;

    const tiempo = document.createElement("h6");
    tiempo.textContent = `Tiempo: ${examen.tiempo} min`;

    const porcentaje = document.createElement("h6");
    porcentaje.textContent = `Porcentaje: ${examen.porcentaje}%`;

    const descripcion = document.createElement("h6");
    descripcion.textContent = `Descripcion: ${examen.descripcion}`;

    const editar = document.createElement("button")
    editar.textContent = "Editar"
    editar.classList.add("edit")
    editar.addEventListener("click",() =>{
        editarExamen(examen);
    })
    
    const eliminar = document.createElement("button")
    eliminar.textContent = "Eliminar"
    eliminar.classList.add("delete")
    eliminar.addEventListener("click", ()=>{
        eliminarExamen(tarjeta,examen.codigo)
    })

   
 
    
    divBotones.append(editar,eliminar)
    divBotones.classList.add("botones")
    tarjeta.append(codigo,titulo,tiempo,porcentaje,descripcion,divBotones);


    
    tarjeta.classList.add("tarjeta-usuario")

    examenes.append(tarjeta);

    document.querySelector(".users-top p").textContent =
    `${examenesDB.length} registros`;
}

function agregarPreguntas() {
    const contenedor = document.getElementById("contenedor-preguntas");

    const tarjeta = document.createElement("div");
    tarjeta.classList.add("main-container-questions-card");

    tarjeta.innerHTML = `
        <div class="main-container-questions-card-title">
            <h6>Pregunta ${contadorPreguntas}</h6>
            <button type="button" class="delete">Eliminar</button>
        </div>

        <div class="main-container-questions-card-text">
            <input type="text" placeholder="Texto de la pregunta..." class="pregunta-text">
        </div>

         <div class="main-container-questions-card-container-questions">
            <section>
                <div class="main-container-questions-card-options">
                    <input type="radio" name= "pregunta-${contadorPreguntas}" class="check-question">
                    <input type="text" class="check-text" placeholder="Escribe la pregunta aqui">
                    <button>Quitar</button>
                </div>

                <div class="main-container-questions-card-options">
                    <input type="radio" name= "pregunta-${contadorPreguntas}" class="check-question">
                    <input type="text" class="check-text" placeholder="Escribe la pregunta aqui">
                    <button>Quitar</button>
                </div>     
                
                    <div class="main-container-questions-card-options">
                    <input type="radio" name= "pregunta-${contadorPreguntas}" class="check-question">
                    <input type="text" class="check-text" placeholder="Escribe la pregunta aqui">
                    <button>Quitar</button>
                </div> 
                <div class="main-container-questions-card-container-questions-button">
                    <button type="button">Agregar respuesta</button>
                </div>
            </section>
        </div>

        
    `;

    contenedor.append(tarjeta);

    const botonEliminar = tarjeta.querySelector(".main-container-questions-card-title button");
    

    botonEliminar.addEventListener("click", () => {

    const preguntas =
    document.querySelectorAll(
        ".main-container-questions-card"
    );

    if(preguntas.length <= 1){
        alert(
            "El examen debe tener al menos una pregunta"
        );
        return;
    }

    tarjeta.remove();
    actualizarNumeracion();
    });

    configurarBotonesQuitar(tarjeta);

    const btnAgregarRespuesta = tarjeta.querySelector(
    ".main-container-questions-card-container-questions-button button"
    );

    btnAgregarRespuesta.addEventListener("click", () => {
        agregarRespuesta(tarjeta);
    });


    contadorPreguntas++;
}

function validarCheckbox() {

    const tarjetas = document.querySelectorAll(".main-container-questions-card");

    for (let tarjeta of tarjetas) {

        const marcada = [...tarjeta.querySelectorAll(".check-question")]
            .some(check => check.checked);

        if (!marcada) {
            alert("Cada pregunta debe tener al menos una respuesta correcta.");
            return false;
        }
    }

    return true;
}

function validarInputs() {
    const inputs = document.querySelectorAll('input[type="text"]');

    for (let input of inputs) {
        if (input.value.trim() === "") {
            alert("Todos los campos deben estar llenos.");
            return false;
        }
    }

    return true;
}


function actualizarNumeracion() {
    const preguntas = document.querySelectorAll(".main-container-questions-card");

    preguntas.forEach((pregunta, index) => {
        pregunta.querySelector("h6").textContent = `Pregunta ${index + 1}`;
    });

    contadorPreguntas = preguntas.length + 1;
}

function configurarBotonesQuitar(tarjeta){

    tarjeta.querySelectorAll(
        ".main-container-questions-card-options button"
    ).forEach(btn => {

        btn.addEventListener("click", () => {

            const respuestas = tarjeta.querySelectorAll(
                ".main-container-questions-card-options"
            );

            if (respuestas.length <= 1) {
                alert("La pregunta debe tener al menos una respuesta.");
                return;
            }

            btn.closest(
                ".main-container-questions-card-options"
            ).remove();
        });

    });

}

function eliminarExamen(tarjeta,codigo){
    tarjeta.remove()

    examenesDB = examenesDB.filter(e => e.codigo != codigo);
    guardarExamen()

    document.querySelector(".users-top p").textContent = `${examenesDB.length} registros`;
}

function guardarExamen() {
    localStorage.setItem("examenes", JSON.stringify(examenesDB));
}

function editarExamen(examen){

    const btnActualizar = document.getElementById("crear")
    

    document.getElementById("codigo").value = examen.codigo;
    document.getElementById("titulo").value = examen.titulo;
    document.getElementById("tiempo").value = examen.tiempo;
    document.getElementById("porcentaje").value = examen.porcentaje;
    document.getElementById("descripcion").value = examen.descripcion;



    const contenedor = document.getElementById("contenedor-preguntas");
    contenedor.innerHTML = "";

    examen.preguntas.forEach((pregunta, index) => {

        const tarjeta = document.createElement("div");
        tarjeta.classList.add("main-container-questions-card");

        tarjeta.innerHTML = `
            <div class="main-container-questions-card-title">
                <h6>Pregunta ${index + 1}</h6>
                <button type="button" class="delete">Eliminar</button>
            </div>

            <div class="main-container-questions-card-text">
                <input type="text"
                    class="pregunta-text"
                    value="${pregunta.texto}">
            </div>

            <div class="main-container-questions-card-container-questions">
                <section></section>
            </div>
        `;

        const section = tarjeta.querySelector("section");

        pregunta.respuestas.forEach(respuesta => {

            const opcion = document.createElement("div");
            opcion.classList.add("main-container-questions-card-options");

            opcion.innerHTML = `
                <input type="radio"
                       name="pregunta-${index}"
                       class="check-question"
                       ${respuesta.correcta ? "checked" : ""}>

                <input type="text"
                       class="check-text"
                       value="${respuesta.texto}">

                <button type="button" class="gray">Quitar</button>
            `;

            section.append(opcion);
        });

        contenedor.append(tarjeta);
        const botonEliminar = tarjeta.querySelector(".main-container-questions-card-title button");
    

        botonEliminar.addEventListener("click", () => {
        tarjeta.remove();
        actualizarNumeracion()
        });

        codigoEditando = examen.codigo;

        btnActualizar.textContent = "Actualizar"
        btnActualizar.setAttribute("onclick","actualizarExamen()")

        contadorPreguntas = examen.preguntas.length + 1;
    });
}

function agregarRespuesta(tarjeta) {

    

    const section = tarjeta.querySelector(
        ".main-container-questions-card-container-questions section"
    );


    const contenedorRespuesta = document.createElement("div");
    contenedorRespuesta.classList.add("main-container-questions-card-options");

    const nombreGrupo =
    tarjeta.querySelector(".check-question").name;

    contenedorRespuesta.innerHTML = `
    <input type="radio" name="${nombreGrupo}" class="check-question">

    <input type="text" class="check-text" placeholder="Escribe la respuesta aqui">

    <button type="button">Quitar</button>`;

    section.insertBefore(
        contenedorRespuesta,
        section.querySelector(".main-container-questions-card-container-questions-button")
    );

    contenedorRespuesta.querySelector("button").addEventListener("click", () => {

        const respuestas = tarjeta.querySelectorAll(
            ".main-container-questions-card-options"
        );

        if (respuestas.length <= 1) {
            alert("La pregunta debe tener al menos una respuesta.");
            return;
        }

        contenedorRespuesta.remove();
    });

}

function actualizarExamen(){

    const preguntas = document.querySelectorAll(
        ".main-container-questions-card"
    );

    if (preguntas.length < 1) {
        alert("Debe agregar al menos una pregunta.");
        return;
    }

    if (!validarRespuestas()) {
        return;
    }

    let bancoPreguntas = [];

    preguntas.forEach(tarjeta => {

        const textoPregunta = tarjeta.querySelector(".pregunta-text").value;

        let respuestas = [];

        tarjeta.querySelectorAll(".main-container-questions-card-options").forEach(opcion => {

            respuestas.push({
                texto: opcion.querySelector(".check-text").value,
                correcta: opcion.querySelector(".check-question").checked
            });

        });

        bancoPreguntas.push({
            texto: textoPregunta,
            respuestas: respuestas
        });

    });

    const nuevoCodigo = document.getElementById("codigo").value;

    const existe = examenesDB.some(
        e => e.codigo === nuevoCodigo && e.codigo !== codigoEditando
    );

    if (existe) {
        alert("Ya existe un examen con ese codigo");
        return;
    }

    const indice = examenesDB.findIndex(
        e => e.codigo == codigoEditando
    );

    examenesDB[indice] = {
        codigo: document.getElementById("codigo").value,
        titulo: document.getElementById("titulo").value,
        tiempo: document.getElementById("tiempo").value,
        porcentaje: document.getElementById("porcentaje").value,
        descripcion: document.getElementById("descripcion").value,
        preguntas: bancoPreguntas
    };

    guardarExamen();

    document.getElementById("examenes").innerHTML = "";

    examenesDB.forEach(examen => mostrarTarjeta(examen));

    limpiarFormulario();

    const btnActualizar = document.getElementById("crear");
    btnActualizar.textContent = "Crear";
    btnActualizar.setAttribute("onclick", "crearExamen()");

    codigoEditando = null;
}



function validarRespuestas() {

    const tarjetas = document.querySelectorAll(".main-container-questions-card");

    for (let tarjeta of tarjetas) {

        const respuestas = tarjeta.querySelectorAll(
            ".main-container-questions-card-options"
        );

        if (respuestas.length < 2) {
            alert("Cada pregunta debe tener al menos dos respuestas.");
            return false;
        }
    }

    return true;
}