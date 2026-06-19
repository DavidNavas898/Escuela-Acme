const sesion = JSON.parse(sessionStorage.getItem('sesionActiva')) || null;
if (!sesion || !sesion.logueado) {
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const saludo = document.getElementById('saludo-usuario');
    if (saludo && sesion) {
        const rol = sesion.cargo === 'administrativo' ? 'Administrador' : 'Docente';
        saludo.textContent = `Sesión iniciada como ${rol}`;
    }

    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            sessionStorage.removeItem('sesionActiva');
            window.location.href = 'login.html';
        });
    }
});