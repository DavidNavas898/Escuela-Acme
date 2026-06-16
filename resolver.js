let cronometro = null;
let examenActual = null;
let tiempoRestante = 0;
let respuestasElegidas = {};
let idEstudiante ='';
let nombreEstudiante = '';
let idExamenPendiente = null;


function renderizarExamen(){
    const examenes = obtenerExamenes();
    const cuadricula = document.getElementById('cuadricula-examenes');

    if (!examenes.length){
        cuadricula.innerHTML = `
        <div class= "estado-vacio">
        <p>los administradores aun no han publicado examenes</p>
        </div>
        `;
        return;
    }

    cuadricula.innerHTML = examenes.map(e => `
        <div class = "tarjeta-examen">
            <div class= "codigo-examen">${e.codigo}</div>
            <div class= "nombre-examen">${e.titulo}</div>
            <div class="descripcion-examen">${e.descripcion || ''}</div>
            <div class = "meta-examen"> 
                    <div class = "elemento-meta"><strong${e.tiempo} min</strong>Tiempo</div>
                    <div class="elemento-meta"><strong>${e.tiempo} min</strong>Tiempo</div>
                    <div class="elemento-meta"><strong>${e.aprobacion}%</strong>Aprobación</div>
                    <div class="elemento-meta"><strong>${e.preguntas ? e.preguntas.length : 0}</strong>Preguntas</div>
            </div>
            <button class = "btn-iniciar-examen" onclick="abrirModalEstudiante('${e.id}')">
                Iniciar Examen
            </button>
   </div>
   `).join('');
 
}   

function abrirModalEstudiante(idExamen) {
    idExamenPendiente = idExamen;
    const examen = obtenerExamen().find(e=> e.id === idExamen);
    if (!examen) return;

    document.getElementById('titulo-modal-examen').textContent = examen.titulo;
    document.getElementById('campo-identificacion-estudiante').value = '';
    document.getElementById('campo-nombre-estudiante').value='';
    document.getElementById('modal-estudiante').classList.add('abierto');

}

function cerrarModalEstudiante() {
    document.getElementById('modal-estudiante').classList.remove('abierto');
    idExamenPendiente = null;
}

function comenzarExamen(){
    const identificacion = document.getElementById('campo-identificacion-estudiante').value.trim();
    const nombre = document.getElementById('campo-nombre-estudiante').value.trim();

    if (!identificacion || !nombre){
        mostrarNotificacion('ingresa tu identificacion y nombre.', 'error');
        return;

    }

    const examen = obtenerExamen().find(e => e.id === idExamenPendiente);
    if (!examen) return;

    idEstudiante   = identificacion;
    nombreEstudiante = nombre;
    examenActual   = examen;
    respuestasElegidas ={};


    cerrarModal()
    renderizarExamenActivo()
    
}

function renderizarExamenActivo() {
  document.getElementById('titulo-examen-activo').textContent = examenActual.titulo;
  document.getElementById('meta-examen-activo').textContent   =
    `${examenActual.preguntas.length} preguntas · Aprobación: ${examenActual.aprobacion}%`;

  const cuerpo = document.getElementById('cuerpo-examen');
  cuerpo.innerHTML = examenActual.preguntas.map((pregunta, indice) => `
    <div class="elemento-pregunta">
      <div class="numero-pregunta">Pregunta ${indice + 1} de ${examenActual.preguntas.length}</div>
      <div class="texto-pregunta">${escaparHtml(pregunta.texto)}</div>
      ${pregunta.respuestas.map(resp => `
        <div class="opcion-respuesta" id="opcion_${resp.id}"
             onclick="elegirRespuesta('${pregunta.id}','${resp.id}')">
          <input type="radio" name="preg_${pregunta.id}" value="${resp.id}">
          <div class="circulo-opcion"></div>
          <span>${escaparHtml(resp.texto)}</span>
        </div>
      `).join('')}
    </div>
  `).join('') + `<button class="btn-terminar" onclick="terminarExamen()">Terminar examen</button>`;
   iniciarCronometro(examenActual.tiempo * 60);
   irA('resolviendo');
}

function elegirRespuesta(idPregunta, idRespuesta) {
  const pregunta = examenActual.preguntas.find(p => p.id === idPregunta);
  /* lo siguiente es para deseleccionar preguntas del eaxmen*/
  pregunta.respuestas.forEach(r => {
    document.getElementById('opcion_' + r.id)?.classList.remove('seleccionada');
  });
  document.getElementById('opcion_' + idRespuesta)?.classList.add('seleccionada');
  respuestasElegidas[idPregunta] = idRespuesta;
}

function iniciarCronometro () {
detenerCronometro();
tiempoRestante = segundos;
actualizarReloj();

cronometro = setinterval(() => {
    tiempoRestante --;
    if (tiempoRestante <= 60 ) document.getElementById ('reloj.examen').classList.add('advertencia');
    if (tiempoRestante <= 0) terminarExamen();

    },1000);



}

function detenerCronometro() {
  if (cronometro) { clearInterval(cronometro); cronometro = null; }
}

function actualizarReloj () {
    const minutos  = Math.floor (tiempoRestante / 60).toString().padStart(2, '0');
    const segundos = (tiempoRestante % 60).toString().padStart(2, '0')
    document.getElementById('reloj-examen').textContent =` ${minutos}:${segundos}`;
}

function terminarExamen (){
    detenerCronometro();
    if (!examenActual) return;

    let aciertos = 0;
     examenActual.preguntas.forEach(pregunta => {
        const elegida = respuestasElegidas[pregunta.id];
        const correcta = pregunta.respuestas.find( r => r.correcta);
        if (elegida && correcta  && elegida === correcta.id) aciertos++;
     });

     const total = examenActual.preguntas.length;
     const porcentaje = total ? Math.round((aciertos / total) * 100): 0;
     const aprobado = porcentaje >= examenActual.aprobacion;

     /*pantalla de resultado */

     const elementoPuntacion = document.getElementById('puntuaion-resultado') ;
     elementoPuntacion.textContent = porcentaje + '%';
     elementoPuntacion.className = 'puntuacion-resultado ' + (aprobado ? 'aprobado' : 'reprobado');

     const elementoEstado = document.getElementById('estado-resultado');
     elementoEstado.textContent = aprobado ? '¡Examen aprobado!' : 'Examen no aprobado';
     elementoEstado.className   = 'estado-resultado ' + (aprobado ? 'aprobado' : 'reprobado');

     document.getElementById('info-resultado').textContent = 
     `${nombreEstudiante} · Identificación: ${idEstudiante}\n` +
    `${aciertos} de ${total} respuestas correctas. Se requiere ${examenActual.aprobacion}% para aprobar.`;

    irA('resultado');
}
