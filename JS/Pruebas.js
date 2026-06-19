(function cargarDatosPrueba() {
    if (localStorage.getItem("examenes")) return;

    const examenes = [
        {
            codigo: "MAT-01",
            titulo: "Matemáticas Básicas",
            tiempo: 10,
            porcentaje: 60,
            descripcion: "Examen de operaciones básicas: suma, resta, multiplicación y división.",
            preguntas: [
                {
                    texto: "¿Cuánto es 15 + 27?",
                    respuestas: [
                        { texto: "42", correcta: true },
                        { texto: "38", correcta: false },
                        { texto: "45", correcta: false },
                    ]
                },
                {
                    texto: "¿Cuánto es 8 × 7?",
                    respuestas: [
                        { texto: "54", correcta: false },
                        { texto: "56", correcta: true },
                        { texto: "64", correcta: false },
                    ]
                },
                {
                    texto: "¿Cuánto es 100 ÷ 4?",
                    respuestas: [
                        { texto: "20", correcta: false },
                        { texto: "30", correcta: false },
                        { texto: "25", correcta: true },
                    ]
                },
                {
                    texto: "¿Cuánto es 13 × 13?",
                    respuestas: [
                        { texto: "169", correcta: true },
                        { texto: "163", correcta: false },
                        { texto: "196", correcta: false },
                    ]
                },
                {
                    texto: "¿Cuál es el resultado de 200 - 87?",
                    respuestas: [
                        { texto: "113", correcta: true },
                        { texto: "123", correcta: false },
                        { texto: "103", correcta: false },
                    ]
                },
            ]
        },
        {
            codigo: "JS-01",
            titulo: "Fundamentos de JavaScript",
            tiempo: 15,
            porcentaje: 70,
            descripcion: "Evalúa conocimientos básicos de JavaScript: variables, tipos de datos y funciones.",
            preguntas: [
                {
                    texto: "¿Cuál de las siguientes es una forma correcta de declarar una variable en JavaScript?",
                    respuestas: [
                        { texto: "var nombre = 'Juan';", correcta: true },
                        { texto: "variable nombre = 'Juan';", correcta: false },
                        { texto: "int nombre = 'Juan';", correcta: false },
                    ]
                },
                {
                    texto: "¿Qué método se usa para imprimir algo en la consola del navegador?",
                    respuestas: [
                        { texto: "print()", correcta: false },
                        { texto: "console.log()", correcta: true },
                        { texto: "log.console()", correcta: false },
                    ]
                },
                {
                    texto: "¿Qué devuelve typeof 42?",
                    respuestas: [
                        { texto: "'number'", correcta: true },
                        { texto: "'integer'", correcta: false },
                        { texto: "'string'", correcta: false },
                    ]
                },
                {
                    texto: "¿Cuál es la diferencia entre == y ===?",
                    respuestas: [
                        { texto: "No hay diferencia", correcta: false },
                        { texto: "=== compara valor y tipo, == solo valor", correcta: true },
                        { texto: "== compara valor y tipo, === solo valor", correcta: false },
                    ]
                },
                {
                    texto: "¿Cómo se declara una función en JavaScript?",
                    respuestas: [
                        { texto: "function miFuncion() {}", correcta: true },
                        { texto: "func miFuncion() {}", correcta: false },
                        { texto: "def miFuncion() {}", correcta: false },
                    ]
                },
                {
                    texto: "¿Qué hace el método push() en un array?",
                    respuestas: [
                        { texto: "Elimina el último elemento", correcta: false },
                        { texto: "Agrega un elemento al final", correcta: true },
                        { texto: "Agrega un elemento al inicio", correcta: false },
                    ]
                },
            ]
        },
        {
            codigo: "HTML-01",
            titulo: "HTML y CSS Básico",
            tiempo: 12,
            porcentaje: 65,
            descripcion: "Conceptos esenciales de HTML5 y CSS3 para el desarrollo web.",
            preguntas: [
                {
                    texto: "¿Cuál etiqueta se usa para el título principal de una página?",
                    respuestas: [
                        { texto: "<title>", correcta: false },
                        { texto: "<h1>", correcta: true },
                        { texto: "<header>", correcta: false },
                    ]
                },
                {
                    texto: "¿Qué atributo se usa en <img> para texto alternativo?",
                    respuestas: [
                        { texto: "title", correcta: false },
                        { texto: "src", correcta: false },
                        { texto: "alt", correcta: true },
                    ]
                },
                {
                    texto: "¿Cuál propiedad CSS cambia el color del texto?",
                    respuestas: [
                        { texto: "font-color", correcta: false },
                        { texto: "color", correcta: true },
                        { texto: "text-color", correcta: false },
                    ]
                },
                {
                    texto: "¿Qué significa HTML?",
                    respuestas: [
                        { texto: "HyperText Markup Language", correcta: true },
                        { texto: "HighText Machine Language", correcta: false },
                        { texto: "HyperText Machine Links", correcta: false },
                    ]
                },
                {
                    texto: "¿Cuál es la etiqueta correcta para un enlace?",
                    respuestas: [
                        { texto: "<link>", correcta: false },
                        { texto: "<href>", correcta: false },
                        { texto: "<a>", correcta: true },
                    ]
                },
            ]
        },
        {
            codigo: "GEO-01",
            titulo: "Geografía de Colombia",
            tiempo: 8,
            porcentaje: 60,
            descripcion: "Preguntas sobre departamentos, capitales y datos generales de Colombia.",
            preguntas: [
                {
                    texto: "¿Cuál es la capital de Colombia?",
                    respuestas: [
                        { texto: "Medellín", correcta: false },
                        { texto: "Bogotá", correcta: true },
                        { texto: "Cali", correcta: false },
                    ]
                },
                {
                    texto: "¿Cuántos departamentos tiene Colombia?",
                    respuestas: [
                        { texto: "28", correcta: false },
                        { texto: "32", correcta: true },
                        { texto: "30", correcta: false },
                    ]
                },
                {
                    texto: "¿Cuál es el río más largo de Colombia?",
                    respuestas: [
                        { texto: "Río Cauca", correcta: false },
                        { texto: "Río Amazonas", correcta: false },
                        { texto: "Río Magdalena", correcta: true },
                    ]
                },
                {
                    texto: "¿En qué departamento está Floridablanca?",
                    respuestas: [
                        { texto: "Cundinamarca", correcta: false },
                        { texto: "Santander", correcta: true },
                        { texto: "Antioquia", correcta: false },
                    ]
                },
                {
                    texto: "¿Cuál es la montaña más alta de Colombia?",
                    respuestas: [
                        { texto: "Nevado del Ruiz", correcta: false },
                        { texto: "Pico Cristóbal Colón", correcta: true },
                        { texto: "Nevado del Huila", correcta: false },
                    ]
                },
            ]
        },
    ];

    localStorage.setItem("examenes", JSON.stringify(examenes));
    console.log("Datos de prueba cargados correctamente.");
})();