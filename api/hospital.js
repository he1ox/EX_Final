// Función de utilidad para realizar peticiones HTTP GET
const fetchData = async (url, token) => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        });

        if (!response.ok) {
            throw new Error(`Error al obtener los datos desde ${url}`);
        }

        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

// Función para obtener expedientes
exports.getExpedientes = (token) => {
    return fetchData('http://localhost:3000/hospital/allRecord', token);
};

// Función para obtener pacientes
exports.getPatients = (token) => {
    return fetchData('http://localhost:3000/hospital/allPatient', token);
};