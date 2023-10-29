// Utility function to set form fields
function setFormFields(data) {
    const fields = [
        'name',
        'birthdate',
        'gender',
        'address',
        'phone',
        'email',
        'medicalRecords'
    ];

    fields.forEach(field => {
        if (data[field]) {
            document.querySelector(`#${field}`).value = data[field];
        } else {
            document.querySelector(`#${field}`).value = '';
        }
    });
}

// Function to get form data
function getFormData() {
    const fields = [
        'name',
        'birthdate',
        'gender',
        'address',
        'phone',
        'email',
        'medicalRecords'
    ];

    return fields.reduce((acc, field) => {
        acc[field] = document.querySelector(`#${field}`).value;
        return acc;
    }, {});
}

// Function to handle HTTP requests
async function httpRequest(url, method, token, body = null) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };

    const options = {
        method,
        headers
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    return await response.json();
}

async function cancelEvent() {
    setFormFields({});
    const btn = document.querySelector('#btn');
    btn.innerHTML = 'Guardar';
    btn.onclick = function () {
        create();
    };
}

async function create() {
    const data = getFormData();
    const token = localStorage.getItem('token');
    const res = await httpRequest('http://localhost:3000/hospital/createPatient', 'POST', token, data);
    console.log(res);
    window.location.reload();
}

async function deletePatient(id) {
    const token = localStorage.getItem('token');
    const res = await httpRequest(`http://localhost:3000/hospital/deletePatient/${id}`, 'DELETE', token);
    console.log(res);
    window.location.reload();
}

async function editPatient(id) {
    const token = localStorage.getItem('token');
    const data = await httpRequest(`http://localhost:3000/hospital/patient/${id}`, 'GET', token);

    data.birthdate = data.birthdate.split('T')[0];
    setFormFields(data);

    const btnCancel = document.querySelector('#btn-cancel');
    btnCancel.innerHTML = 'Cancelar';
    btnCancel.onclick = function () {
        cancelEvent();
    };

    const btn = document.querySelector('#btn');
    btn.innerHTML = 'Actualizar';
    btn.onclick = function () {
        updatePatient(id);
    };
}

async function updatePatient(id) {
    const data = getFormData();
    const token = localStorage.getItem('token');
    const res = await httpRequest(`http://localhost:3000/hospital/updatePatient/${id}`, 'PUT', token, data);
    console.log(res);
    window.location.reload();
}