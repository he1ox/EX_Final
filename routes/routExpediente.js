const express = require('express');
const connectionMongo = require('../database/MongoDBCO');
const recordController = require('../controller/RecordController')
const patientController = require('../controller/PatientController')
const userController = require('../controller/UserController')
const validateToken = require('../auth/jwtTokens');
connectionMongo.mongodbConnection();

const router = express.Router();

router.get('/', function (req, res){
    res.send('Welcome to Hospital API');
});

// Pacientes
router.get('/allPatient', validateToken.validateToken, patientController.getPatients );
router.get('/patient/:id', validateToken.validateToken, patientController.getOnePatient);
router.post('/createPatient', validateToken.validateToken, patientController.createPatient);
router.put('/updatePatient/:id', validateToken.validateToken, patientController.updatePatient);
router.delete('/deletePatient/:id', validateToken.validateToken, patientController.deletePatient);

// Expedientes
router.get('/allRecord', validateToken.validateToken, recordController.getRecords);
router.get('/record/:id', validateToken.validateToken, recordController.getOneRecord);
router.post('/createRecord', validateToken.validateToken, recordController.createRecord);
router.put('/updateRecord/:id', validateToken.validateToken, recordController.updateRecord);
router.delete('/deleteRecord/:id', validateToken.validateToken, recordController.deleteRecord);

// Usuarios
router.post('/createUser', userController.createUser);
router.delete('/deleteUser/:id', validateToken.validateToken, userController.deleteUser);
router.post('/login', userController.login);

exports.routerExpediente = router;