# Escuela-Acme
# 🏫 AcmeSchool

Proyecto web hecho con HTML, CSS y JavaScript vanilla para gestionar exámenes y usuarios de una institución educativa. Lo desarrollamos como ejercicio colaborativo y la verdad quedó bastante bien para ser nuestro primer proyecto así de completo.

---

## 👥 Equipo

| Nombre | Rol |
|---|---|
| David Navas | Gestion de exámenes y usuario |
| Sergio | Autenticación y login |
| Jofran Rodriguez | resolver examenes y portal admin |

---

## 🗂️ Estructura del proyecto

```
Escuela-Acme/
├── login.html           # Página de inicio de sesión (módulo privado)
├── portaladmin.html     # Dashboard del administrador
├── gestion_usuarios.html # Gestión de usuarios
├── crear_examen.html    # Crear y editar exámenes
├── resolver.html        # Vista pública para resolver exámenes
│
├── CSS/
│   ├── login-styles.css # Estilos de la pantalla de login
│   ├── style.css        # Estilos compartidos (usuarios, formularios)
│   ├── styles.css       # Estilos de creación de exámenes
│   ├── dashboard.css    # Estilos del panel admin
│   └── resolver.css     # Estilos de la vista de exámenes
│
└── JS/
    ├── login-controller.js  # Manejo del login y credenciales
    ├── auth.js              # Verificación de sesión activa
    ├── app.js               # Gestión de usuarios (CRUD)
    ├── dashboard.js         # Lógica del panel admin
    ├── examen.js            # Creación y edición de exámenes
    └── resolver.js          # Lógica para resolver exámenes y calcular resultado
```

---

## ✨ Funcionalidades

### Módulo público — `resolver.html`
- Ver el listado de exámenes disponibles con su código, descripción, tiempo y porcentaje de aprobación
- Ingresar nombre y apellido antes de empezar
- Resolver el examen con temporizador en tiempo real
- Ver resultado al terminar (aprobado / reprobado)

### Módulo privado — requiere login
- **Login** con credenciales guardadas en `localStorage`
- **Dashboard** con acceso rápido a las secciones
- **Gestión de usuarios** — crear, editar y eliminar usuarios con campos: cédula, nombre, correo, teléfono, cargo y contraseña
- **Crear exámenes** — formulario con preguntas y opciones de respuesta múltiple, con indicador de respuesta correcta

---

## 🚀 Cómo correrlo

No necesita instalación ni servidor. Solo abre el archivo `login.html` en el navegador.

```
Doble clic en login.html  ✅
```

O si tienes la extensión **Live Server** en VS Code, clic derecho → *Open with Live Server*.

### Credenciales de prueba

```
Correo:     admin@acme.edu
Contraseña: Admin123
```

---

## 🛠️ Tecnologías usadas

- **HTML5** — estructura semántica
- **CSS3** — diseño responsivo con Grid y Flexbox, sin frameworks
- **JavaScript ES6+** — vanilla puro, sin librerías externas
- **localStorage / sessionStorage** — persistencia de datos en el navegador
- **Tabler Icons** — íconos via CDN (solo en el panel admin)

---

## 📋 Notas

- Los datos de usuarios y exámenes se guardan en el `localStorage` del navegador, así que si limpias el almacenamiento del sitio los datos se borran.
- La sesión se maneja con `sessionStorage`, entonces al cerrar la pestaña la sesión se cierra automáticamente.
- El proyecto está pensado para desktop pero tiene algo de responsividad en móvil.

---

> Proyecto colaborativo — David Navas, Sergio y Jofran Rodriguez 🚀