const listaUsuariosDefault = [
    {
        id: "USR-001",
        name: "admin",
        email: "admin@acme.edu",
        telefono: "+57 300 123 4567",
        cargo: "Administrador",
        password: "Admin123"
    },
    {
        id: "USR-002",
        name: "sergio",
        email: "sergio@email.com",
        telefono: "+57 315 987 6543",
        cargo: "docente",
        password: "123"
    },
    {
        id: "USR-002",
        name: "david",
        email: "david@email.com",
        telefono: "+57 315 987 6543",
        cargo: "docente",
        password: "123"
    },
    {
        id: "USR-003",
        name: "junior",
        email: "junior@email.com",
        telefono: "+34 612 345 678",
        cargo: "docente",
        password: "123"
    }
];

function inicializarUsuarios() {
    if (!localStorage.getItem('usuarios')) {
        localStorage.setItem('usuarios', JSON.stringify(listaUsuariosDefault));
        console.log('LocalStorage inicializado con 5 usuarios.');
    } else {
        console.log('ℹYa existen usuarios en el LocalStorage, no se sobrescribieron.');
    }
}

inicializarUsuarios();