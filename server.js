const express = require('express');
const cors = require('cors');
const routerExpediente = require('./routes/routExpediente');
const viewsRoutes = require('./routes/viewRouts');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configuraciones
const configureApp = () => {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(express.json());
    app.use('/static', express.static(__dirname + '/public'));

    app.set('views', './views');
    app.set('view engine', 'pug');
};

// Rutas
const initializeRoutes = () => {
    app.get('/', (req, res) => {
        res.render('index', {
            name: 'Hola mundo!!!'
        });
    });

    app.use('/app', viewsRoutes.viewsRoutes);
    app.use('/hospital', routerExpediente.routerExpediente);
};

// Inicialización
const initializeApp = () => {
    configureApp();
    initializeRoutes();

    app.listen(port, () => {
        console.log(`http://localhost:${port}`);
        console.log('http://localhost:3000/hospital');
        console.log('http://localhost:3000/app');
    });
};

initializeApp();