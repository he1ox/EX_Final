const express = require('express');
const router = express.Router();
const validateToken = require('../auth/jwtValidate')

const api = require('../api/apiHostipal')

router.get('/inicio', validateToken.validateTokenUrl, function (req, res) {
    res.render('index');
});

router.get('/expedientes', validateToken.validateTokenUrl, function (req, res) {
    const token = req.query.token;
    console.log(token);
    api.getExpedientes(token)
        .then(response => {
            if (Array.isArray(response)) {
                return res.render('panelRecords', { title: 'Formulario de creación de paciente', records: response });
            } else {
                return res.status(500).send('Error al obtener los expedientes.');
            }
        })
        .catch(error => {
            return res.status(500).send('Error al obtener los expedientes.');
        });
});


router.get('/pacientes', validateToken.validateTokenUrl, function (req, res) {
    const token = req.query.token;
    console.log(token);
    api.getPatients(token)
        .then(response => {
            if (Array.isArray(response)) {
            
                return res.render('panelPatient', { title: 'Formulario de creación de paciente', patients: response });
            } else {
                return res.status(500).send('Error al obtener los pacientes.');
            }
        })
        .catch(error => {
            console.log(error);
            return res.status(500).send('Error al obtener los pacientes.');
        });
})

router.get('/', function (req, res) {
    res.render('login')
});



exports.viewsRoutes = router;
