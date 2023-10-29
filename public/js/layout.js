function redirectTo(path) {
    const token = localStorage.getItem('token');
    console.log(token);
    window.location.href = `http://localhost:3000/app/${path}?token=${token}`;
}

function inicio() {
    redirectTo('inicio');
}

function pacientes() {
    redirectTo('pacientes');
}

function expedientes() {
    redirectTo('expedientes');
}
