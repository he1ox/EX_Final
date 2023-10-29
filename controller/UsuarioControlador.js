const User = require('../models/UserModel');
const generateTokenJWT = require('../auth/jwtValidate');

const handleErrors = (res, err) => {
    return res.status(500).json({
        message: err
    });
}

exports.createUser = async (req, res) => {
    const {
        name,
        lastname,
        email,
        password,
        role
    } = req.body;
    try {
        const user = new User({
            name,
            lastname,
            email,
            password,
            role
        });
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        handleErrors(res, err);
    }
};

exports.deleteUser = async (req, res) => {
    const {
        id
    } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) return res.status(404).json({
            message: 'No se encontro el usuario'
        });
        res.status(200).json(user);
    } catch (err) {
        handleErrors(res, err);
    }
};

exports.getUser = async (req, res) => {
    const {
        id
    } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({
            message: 'No se encontro el usuario'
        });
        const token = generateTokenJWT.genToken(user.email);
        res.status(200).json({
            user,
            token
        });
    } catch (err) {
        handleErrors(res, err);
    }
};

exports.login = async (req, res) => {
    const {
        email,
        password
    } = req.body;
    try {
        const user = await User.findOne({
            email,
            password
        });
        if (!user) return res.status(404).json({
            message: 'No se encontró el usuario'
        });
        const token = generateTokenJWT.genToken(email);
        res.status(200).json({
            token
        });
    } catch (err) {
        handleErrors(res, err);
    }
};