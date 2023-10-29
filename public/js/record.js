
function cancelEvent() {
    document.querySelector('#symptoms').value = '';
    document.querySelector('#diagnosis').value = '';
    document.querySelector('#treatments').value = '';
    document.querySelector('#notes').value = '';
    document.querySelector('#patient').value = '';

    const btn = document.querySelector('#btn');
    btn.innerHTML = 'Crear';
    btn.onclick = function () {
        create();
    }
    

}


async function deleteRecord(id) {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:3000/hospital/deleteRecord/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
    .then(res => res.json())
    .then(data => {
        window.location.reload();
    })
    .catch(err => console.log(err));

}

async function updateRecord(id) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/hospital/record/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });

        const json = await response.json();

        document.querySelector('#symptoms').value = json.symptoms;
        document.querySelector('#diagnosis').value = json.diagnosis;
        document.querySelector('#treatments').value = json.treatments;
        document.querySelector('#notes').value = json.notes;
        document.querySelector('#patient').value = json.patient;

        const btn = document.querySelector('#btn');

        btn.innerHTML = 'Actualizar';
        btn.onclick = function () {
            console.log('Entro a actualizar en el boton');
            update(id);
        }
    }
    catch (err) {
        console.log(err);
    }
}


function update(id) {
    console.log('Entro a actualizar');
    const symptoms = document.querySelector('#symptoms').value;
    const diagnosis = document.querySelector('#diagnosis').value;
    const treatments = document.querySelector('#treatments').value;
    const notes = document.querySelector('#notes').value;
    const patient = document.querySelector('#patient').value;

    const data = {
        patient: patient,
        symptoms: symptoms,
        diagnosis: diagnosis,
        treatments: treatments,
        notes: notes
    }

    try {
        const token = localStorage.getItem('token');
        fetch('http://localhost:3000/hospital/updateRecord/' + id, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al actualizar');
                }
                return response.json();
            })
            .then(json => {
                console.log(json);
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            });
    } catch (err) {
        console.log(err);
    }
}


async function create() {

    const symptoms = document.querySelector('#symptoms').value;
    const diagnosis = document.querySelector('#diagnosis').value;
    const treatments = document.querySelector('#treatments').value;
    const notes = document.querySelector('#notes').value;
    const patient = document.querySelector('#patient').value;

    const data = {
        patient: patient,
        symptoms: symptoms,
        diagnosis: diagnosis,
        treatments: treatments,
        notes: notes
    }

    console.log(data);
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/hospital/createRecord', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        const json = await response.json();
        console.log(json);
    }
    catch (err) {
        console.log(err);
    }
}




