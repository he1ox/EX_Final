const MedicalRecord = require('../models/ModelExpediente');

// Middleware para manejar errores
const errorHandler = (res, err) => {
    return res.status(500).json({
        message: err
    });
};

// Función para manejar respuestas exitosas
const successHandler = (res, data, status = 200) => {
    return res.status(status).json(data);
};

// Obtener todos los registros médicos
exports.getRecords = async (req, res) => {
    try {
        const allRecords = await MedicalRecord.find();
        successHandler(res, allRecords);
    } catch (err) {
        errorHandler(res, err);
    }
};

// Obtener un registro médico por ID
exports.getOneRecord = async (req, res) => {
    const {
        id
    } = req.params;
    try {
        const record = await MedicalRecord.findById(id);
        if (!record) return res.status(404).json({
            message: 'Expediente no se ha encontrado.'
        });
        successHandler(res, record);
    } catch (err) {
        errorHandler(res, err);
    }
};

// Crear un nuevo registro médico
exports.createRecord = async (req, res) => {
    const {
        patient,
        symptoms,
        diagnosis,
        treatments,
        notes
    } = req.body;
    try {
        const newRecord = new MedicalRecord({
            patient,
            symptoms,
            diagnosis,
            treatments,
            notes
        });
        await newRecord.save();
        successHandler(res, newRecord);
    } catch (err) {
        errorHandler(res, err);
    }
};

// Actualizar un registro médico
exports.updateRecord = async (req, res) => {
    const {
        id
    } = req.params;
    const updates = req.body;
    try {
        const record = await MedicalRecord.findById(id);
        if (!record) return res.status(404).json({
            message: 'Expediente no se ha encontrado.'
        });
        record.set(updates);
        await record.save();
        successHandler(res, record);
    } catch (err) {
        errorHandler(res, err);
    }
};

// Eliminar un registro médico
exports.deleteRecord = async (req, res) => {
    const {
        id
    } = req.params;
    try {
        const record = await MedicalRecord.findById(id);
        if (!record) return res.status(404).json({
            message: 'Expediente no se ha encontrado.'
        });
        await record.deleteOne();
        successHandler(res, record);
    } catch (err) {
        errorHandler(res, err);
    }
};