require('dotenv').config();

const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET_KEY || 'defaultSecretKey';

// Función para generar token
exports.genToken = (email) => {
    const token = jwt.sign({ email }, secretKey, { expiresIn: '30m' });
    console.log('Token generado: ', token);
    return token;
}

// Función reutilizable para verificar token
const verifyToken = (token, res, next) => {
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }
        req.user = decoded;
        next();
    });
}

// Validar token desde encabezados (headers)
exports.validateToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'No se ha enviado el token' });
    }
    verifyToken(token, res, next);
}

// Validar token desde URL
exports.validateTokenUrl = (req, res, next) => {
    const token = req.query.token;
    if (!token) {
        return res.status(401).json({ message: 'No se ha enviado el token' });
    }
    verifyToken(token, res, next);
}
