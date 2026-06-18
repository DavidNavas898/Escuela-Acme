let cronometro = null;
let examenActual = null;
let tiempoRestante = 0;
let respuestasElegidas = {};
let idEstudiante = '';
let nombreEstudiante = '';
let codigoExamenPendiente = null;

function obtenerExamenes() {
    return JSON.parse(localStorage.getItem('examenes')) || [];
}

function escaparHtml(texto) {
    const div = document.createElement('div');
    div.textContent = texto ?? '';
    return div.innerHTML;
}

function mostrarNotificacion(mensaje, tipo) {
    const notificacion = document.getElementById('notificacion');
    if (!notificacion) {
        window.alert(mensaje);
        return;
    }
    notificacion.textContent = mensaje;
    notificacion.className = 'visible ' + (tipo || '');
    setTimeout(() => {
        notificacion.className = '';
    }, 3000);
}

function mostrarVista(idVista) {
    document.querySelectorAll('main').forEach(seccion => {
        seccion.classList.add('vista-oculta');
    });
    document.getElementById(idVista).classList.remove('vista-oculta');
}

// ───────── Listado de exámenes ─────────

function renderizarExamenes() {
    const examenes = obtenerExamenes();
    const cuadricula = document.getElementById('cuadricula-examenes');

    if (!examenes.length) {
        cuadricula.innerHTML = `
            <div class="estado-vacio">
                <p>Los administradores aún no han publicado exámenes.</p>
            </div>
        `;
        return;
    }

    cuadricula.innerHTML = examenes.map(examen => `
        <div class="tarjeta-examen">
            <div class="codigo-examen">${escaparHtml(examen.codigo)}</div>
            <div class="nombre-examen">${escaparHtml(examen.titulo)}</div>
            <div class="descripcion-examen">${escaparHtml(examen.descripcion || '')}</div>
            <div class="meta-examen">
                <div class="elemento-meta"><strong>${examen.tiempo} min</strong>Tiempo</div>
                <div class="elemento-meta"><strong>${examen.porcentaje}%</strong>Aprobación</div>
                <div class="elemento-meta"><strong>${examen.preguntas ? examen.preguntas.length : 0}</strong>Preguntas</div>
            </div>
            <button class="btn-iniciar-examen" data-codigo="${escaparHtml(examen.codigo)}">
                Iniciar examen
            </button>
        </div>
    `).join('');

    cuadricula.querySelectorAll('.btn-iniciar-examen').forEach(boton => {
        boton.addEventListener('click', () => abrirModalEstudiante(boton.dataset.codigo));
    });
}

// ───────── Modal de datos del estudiante ─────────

function abrirModalEstudiante(codigoExamen) {
    codigoExamenPendiente = codigoExamen;
    const examen = obtenerExamenes().find(e => e.codigo === codigoExamen);
    if (!examen) return;

    document.getElementById('titulo-modal-examen').textContent = examen.titulo;
    document.getElementById('campo-identificacion-estudiante').value = '';
    document.getElementById('campo-nombre-estudiante').value = '';
    document.getElementById('modal-estudiante').classList.add('abierto');
}

function cerrarModalEstudiante() {
    document.getElementById('modal-estudiante').classList.remove('abierto');
    codigoExamenPendiente = null;
}

function comenzarExamen() {
    const identificacion = document.getElementById('campo-identificacion-estudiante').value.trim();
    const nombre = document.getElementById('campo-nombre-estudiante').value.trim();

    if (!identificacion || !nombre) {
        mostrarNotificacion('Ingresa tu identificación y nombre.', 'error');
        return;
    }

    const examen = obtenerExamenes().find(e => e.codigo === codigoExamenPendiente);
    if (!examen) return;

    if (!examen.preguntas || examen.preguntas.length === 0) {
        mostrarNotificacion('Este examen no tiene preguntas configuradas.', 'error');
        return;
    }

    idEstudiante = identificacion;
    nombreEstudiante = nombre;
    examenActual = examen;
    respuestasElegidas = {};

    cerrarModalEstudiante();
    renderizarExamenActivo();
}

// ───────── Resolviendo el examen ─────────

function renderizarExamenActivo() {
    document.getElementById('titulo-examen-activo').textContent = examenActual.titulo;
    document.getElementById('meta-examen-activo').textContent =
        `${examenActual.preguntas.length} preguntas · Aprobación: ${examenActual.porcentaje}%`;

    const cuerpo = document.getElementById('cuerpo-examen');
    cuerpo.innerHTML = examenActual.preguntas.map((pregunta, indicePregunta) => `
        <div class="elemento-pregunta">
            <div class="numero-pregunta">Pregunta ${indicePregunta + 1} de ${examenActual.preguntas.length}</div>
            <div class="texto-pregunta">${escaparHtml(pregunta.texto)}</div>
            ${pregunta.respuestas.map((respuesta, indiceRespuesta) => `
                <div class="opcion-respuesta" id="opcion_${indicePregunta}_${indiceRespuesta}"
                     data-pregunta="${indicePregunta}" data-respuesta="${indiceRespuesta}">
                    <input type="radio" name="preg_${indicePregunta}">
                    <div class="circulo-opcion"></div>
                    <span>${escaparHtml(respuesta.texto)}</span>
                </div>
            `).join('')}
        </div>
    `).join('') + `<button class="btn-terminar" id="btn-terminar-examen">Terminar examen</button>`;

    cuerpo.querySelectorAll('.opcion-respuesta').forEach(opcion => {
        opcion.addEventListener('click', () => {
            elegirRespuesta(Number(opcion.dataset.pregunta), Number(opcion.dataset.respuesta));
        });
    });
    document.getElementById('btn-terminar-examen').addEventListener('click', terminarExamen);

    mostrarVista('vista-resolviendo');
    iniciarCronometro(examenActual.tiempo * 60);
}

function elegirRespuesta(indicePregunta, indiceRespuesta) {
    const pregunta = examenActual.preguntas[indicePregunta];
    pregunta.respuestas.forEach((_, indice) => {
        document.getElementById(`opcion_${indicePregunta}_${indice}`)?.classList.remove('seleccionada');
    });
    document.getElementById(`opcion_${indicePregunta}_${indiceRespuesta}`)?.classList.add('seleccionada');
    respuestasElegidas[indicePregunta] = indiceRespuesta;
}

function iniciarCronometro(segundos) {
    detenerCronometro();
    tiempoRestante = segundos;
    actualizarReloj();

    cronometro = setInterval(() => {
        tiempoRestante--;
        if (tiempoRestante <= 60) document.getElementById('reloj-examen').classList.add('advertencia');
        actualizarReloj();
        if (tiempoRestante <= 0) terminarExamen();
    }, 1000);
}

function detenerCronometro() {
    if (cronometro) {
        clearInterval(cronometro);
        cronometro = null;
    }
}

function actualizarReloj() {
    const minutos = Math.floor(tiempoRestante / 60).toString().padStart(2, '0');
    const segundos = (tiempoRestante % 60).toString().padS0tart(2, '0');
    document.getElementById('reloj-examen').textContent = `${minutos}:${segundos}`;
}

// ───────── Resultado ─────────

function terminarExamen() {
    detenerCronometro();
    if (!examenActual) return;

    let aciertos = 0;
    examenActual.preguntas.forEach((pregunta, indicePregunta) => {
        const indiceElegido = respuestasElegidas[indicePregunta];
        const indiceCorrecta = pregunta.respuestas.findIndex(r => r.correcta);
        if (indiceElegido !== undefined && indiceElegido === indiceCorrecta) aciertos++;
    });

    const total = examenActual.preguntas.length;
    const porcentaje = total ? Math.round((aciertos / total) * 100) : 0;
    const aprobado = porcentaje >= Number(examenActual.porcentaje);

    const elementoPuntuacion = document.getElementById('puntuacion-resultado');
    elementoPuntuacion.textContent = porcentaje + '%';
    elementoPuntuacion.className = 'puntuacion-resultado ' + (aprobado ? 'aprobado' : 'reprobado');

    const elementoEstado = document.getElementById('estado-resultado');
    elementoEstado.textContent = aprobado ? '¡Examen aprobado!' : 'Examen no aprobado';
    elementoEstado.className = 'estado-resultado ' + (aprobado ? 'aprobado' : 'reprobado');

    document.getElementById('info-resultado').textContent =
        `${nombreEstudiante} · Identificación: ${idEstudiante}\n` +
        `${aciertos} de ${total} respuestas correctas. Se requiere ${examenActual.porcentaje}% para aprobar.`;

    document.getElementById('reloj-examen').classList.remove('advertencia');
    mostrarVista('vista-resultado');
}

function volverAlListado() {
    examenActual = null;
    respuestasElegidas = {};
    renderizarExamenes();
    mostrarVista('vista-listado');
}

// ───────── Inicio ─────────

document.addEventListener('DOMContentLoaded', () => {
    renderizarExamenes();
    document.getElementById('btn-cerrar-modal').addEventListener('click', cerrarModalEstudiante);
    document.getElementById('btn-comenzar-examen').addEventListener('click', comenzarExamen);
    document.getElementById('btn-volver-listado').addEventListener('click', volverAlListado);
});