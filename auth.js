const usuario = sessionStorage.getItem("sesionActiva");

if(!usuario){
    alert("Debe iniciar sesion");
    window.location.href = "/login.html";
}