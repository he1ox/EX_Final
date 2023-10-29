// Importamos mongoose usando la sintaxis ES6
import mongoose from 'mongoose';

// Desestructuramos Schema desde mongoose para simplificar su uso
const { Schema, model, Types } = mongoose;

// Definimos el esquema de un expediente médico
const expedienteSchema = new Schema({
  dateCreated: {
    type: Date,
    default: Date.now
  },
  symptoms: String,
  diagnosis: String,
  treatments: String,
  notes: String,
  patient: {
    type: Types.ObjectId,
    ref: 'Patient'
  }
});

// Definimos el modelo usando el esquema
const MedicalRecord = model('MedicalRecord', expedienteSchema);

// Exportamos el modelo
export default MedicalRecord;
