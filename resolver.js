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