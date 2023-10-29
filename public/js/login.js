async function getUserInput() {
    return {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };
}

async function postLogin(user) {
    const response = await fetch('http://localhost:3000/hospital/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    return response;
}

function redirectToApp(token) {
    window.location.href = `http://localhost:3000/app/inicio?token=${token}`;
}

function displayError(message) {
    const error = document.getElementById('msg-error');
    error.innerHTML = message;
}

async function login() {
    const user = await getUserInput();

    try {
        const response = await postLogin(user);

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            redirectToApp(data.token);
        } else {
            displayError('Correo o contraseña incorrectos');
        }
    } catch (err) {
        displayError('Correo o contraseña incorrectos');
        console.log(err);
    }
}