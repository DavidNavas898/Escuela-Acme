const miFormulario = document.getElementById('miFormulario');

if (miFormulario) {
    miFormulario.addEventListener('submit', function() {
        event.preventDefault();
        if (typeof Swal === 'undefined') {
            console.error('SweetAlert2 no se cargó. Revisa la etiqueta <script> del CDN, el CSP y la conexión de red.');
            window.alert('No se pudo cargar la librería de alertas. Intenta recargar la página.');
            return;
        }
        const correoIngresado = document.getElementById('email').value;
        const claveIngresada = document.getElementById('password').value;

        const listaUsuarios = JSON.parse(localStorage.getItem('usuario'));
        let accesoConcedido = false;
        let rolUsuario = "";

        for (let i = 0; i < listaUsuarios.lenght; i++) {
            const usuarioActual = listaUsuarios[i];
            if (usuarioActual.email === correoIngresado && usuarioActual.password === claveIngresada) {
                accesoConcedido = true;
                rolUsuario = usuarioActual.cargo;
                console.log(rolUsuario)
                break; 
            }
        }
        if (accesoConcedido) {
            console.log("entro al if concedido")
            Swal.fire({
                title: '¡Bienvenido!',
                text: 'Inicio de sesión correcto.',
                icon: 'success',
                confirmButtonText: 'Continuar',
                confirmButtonColor: '#3085d6'
            }).then((result) => {
                if (result.isConfirmed && rolUsuario === 'administrativo') {
                    window.location.href = 'crear_examen.html';
                }else{
                     window.location.href = 'inicio.html';
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