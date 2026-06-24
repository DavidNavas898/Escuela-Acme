const miFormulario = document.getElementById('miFormulario');
(function asegurarAdminPorDefecto(){
    let listaUsuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const yaExiste = listaUsuarios.some(u => u.email === 'admin@acme.edu');
    if (!yaExiste) {
        listaUsuarios.push({
            id: "1234567890",
            name: "admin",
            email: "admin@acme.edu",
            telefono: "",
            cargo: "administrativo",
            password: "Admin123"
        });
        localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
    }
})();

if (miFormulario) {
    miFormulario.addEventListener('submit', function() {
        event.preventDefault();
        if (typeof 'undefined') {
            console.error('SweetAlert2 no se cargó. Revisa la etiqueta <script> del CDN, el CSP y la conexión de red.');
        }
        const correoIngresado = document.getElementById('email').value;
        const claveIngresada = document.getElementById('password').value;

        let listaUsuarios = JSON.parse(localStorage.getItem('usuarios'))|| [];
        const userAdmin = {
        id: "1234567890",
        name: "admin",
        email: "admin@acme.edu",
        telefono: "",
        cargo: "administrativo",
        password: "Admin123"
    }

    listaUsuarios.push(userAdmin);
   

        let accesoConcedido = false;
        let rolUsuario = "";

        for (let i = 0; i < listaUsuarios.length; i++) {
            const usuarioActual = listaUsuarios[i];
            if (usuarioActual.email === correoIngresado && usuarioActual.password === claveIngresada) {
                accesoConcedido = true;
                rolUsuario = usuarioActual.cargo;
                console.log(rolUsuario)
                break; 
            }
        }
if (accesoConcedido) {
    Swal.fire({
        title: '¡Bienvenido!',
        text: 'Inicio de sesión correcto.',
        icon: 'success',
        confirmButtonText: 'Continuar',
        confirmButtonColor: '#3085d6'
    }).then((result) => {
        if (result.isConfirmed) {

            const sesionUsuario = {
                logueado: true,
                cargo: rolUsuario
            };
            sessionStorage.setItem('sesionActiva', JSON.stringify(sesionUsuario));
            if (rolUsuario === 'administrativo') {
                window.location.href = 'portaladmin.html';
            } else {
                window.location.href = 'crear_examen.html';
            }
        }
    });
} else {
            Swal.fire({
                title: 'Error de credenciales',
                text: 'El correo o la contraseña no son correctos.',
                icon: 'error',
                confirmButtonText: 'Intentar de nuevo',
                confirmButtonColor: '#d33'
            });
        }
    });
}

function verificarSesion(){
    const loginV = sessionStorage.getItem("sesionActiva");

    if (loginV){
        alert("Sesion iniciada");
        window.location.href = "gestion_usuarios.html"
    }

    
}

document.addEventListener("DOMContentLoaded", function () {
    verificarSesion();
});