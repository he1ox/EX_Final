const { Schema, model } = require('mongoose');

const REQUIRED_STRING = {
    type: String,
    required: true
};

const MedicalRecordReference = {
    type: Schema.Types.ObjectId,
    ref: 'MedicalRecord'
};

const DEFAULT_MEDICAL_RECORD = {
    type: String,
    default: 'Sin historial clínico'
};

const patientSchema = new Schema({
    name: REQUIRED_STRING,
    birthdate: Date,
    gender: String,
    address: String,
    phone: String,
    email: String,
    medicalRecords: DEFAULT_MEDICAL_RECORD,
    expediente: MedicalRecordReference
});

module.exports = model('Patient', patientSchema);
