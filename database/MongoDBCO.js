// Importamos la librería de Mongoose para trabajar con MongoDB
const mongoose = require('mongoose');

// Definimos una función asíncrona llamada 'mongodbConnection'
const mongodbConnection = async () => {
    try {
        // Intentamos establecer una conexión a MongoDB usando 'mongoose.connect'
        // Los parámetros de configuración adicionales son para evitar advertencias de deprecated
        await mongoose.connect('mongodb://mongo/Hospital', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Si la conexión es exitosa, mostramos el host al que hemos conectado
        console.log(`Connected to MongoDB... ${mongoose.connection.host}`);
    } catch (err) {  // Si ocurre un error durante la conexión
        // Imprimimos un mensaje de error junto con los detalles del mismo
        console.error('Could not connect to MongoDB...', err);
    }
};

// Exportamos la función 'mongodbConnection' para que pueda ser usada en otras partes del código
module.exports = { mongodbConnection };
