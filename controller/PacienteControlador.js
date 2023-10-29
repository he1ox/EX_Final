// Importamos el modelo de datos para un Paciente
const Patient = require('../models/ModelPaciente');

// Función para manejar errores en la respuesta del servidor
const handleErrors = (res, err) => {
    return res.status(500).json({
        message: err
    });
};

// Controlador para obtener todos los pacientes
exports.getPatients = async (req, res) => {
    try {
        // Buscamos todos los pacientes en la base de datos
        const allPatients = await Patient.find({});
        // Devolvemos un estado 200 (OK) y el listado de pacientes
        return res.status(200).json(allPatients);
    } catch (err) {
        // Manejamos cualquier error que ocurra
        handleErrors(res, err);
    }
};

// Controlador para obtener un paciente específico
exports.getOnePatient = async (req, res) => {
    try {
        // Buscamos un paciente por su ID
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            // Si el paciente no se encuentra, devolvemos un estado 404
            return res.status(404).json({
                message: 'No se encontró el paciente'
            });
        }
        // Devolvemos un estado 200 y los datos del paciente
        return res.status(200).json(patient);
    } catch (err) {
        // Manejamos cualquier error que ocurra
        handleErrors(res, err);
    }
};

// Controlador para crear un nuevo paciente
exports.createPatient = async (req, res) => {
    try {
        // Creamos un nuevo paciente con los datos recibidos
        const patient = new Patient(req.body);
        // Guardamos el paciente en la base de datos
        await patient.save();
        // Devolvemos un estado 200 y los datos del nuevo paciente
        return res.status(200).json(patient);
    } catch (err) {
        // Manejamos cualquier error que ocurra
        handleErrors(res, err);
    }
};

// Controlador para actualizar un paciente existente
exports.updatePatient = async (req, res) => {
    try {
        // Buscamos el paciente por su ID
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            // Si el paciente no se encuentra, devolvemos un estado 404
            return res.status(404).json({
                message: 'No se encontró el paciente'
            });
        }
        // Actualizamos los datos del paciente
        Object.assign(patient, req.body);
        // Guardamos el paciente actualizado en la base de datos
        await patient.save();
        // Devolvemos un estado 200 y los datos del paciente actualizado
        return res.status(200).json(patient);
    } catch (err) {
        // Manejamos cualquier error que ocurra
        handleErrors(res, err);
    }
};

// Controlador para eliminar un paciente
exports.deletePatient = async (req, res) => {
    try {
        // Buscamos el paciente por su ID
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            // Si el paciente no se encuentra, devolvemos un estado 404
            return res.status(404).json({
                message: 'No se encontró el paciente'
            });
        }
        // Eliminamos el paciente de la base de datos
        await patient.deleteOne();
        // Devolvemos un estado 200 y un mensaje de éxito
        return res.status(200).json({
            message: 'Paciente eliminado'
        });
    } catch (err) {
        // Manejamos cualquier error que ocurra
        handleErrors(res, err);
    }
};