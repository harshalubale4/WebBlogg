const jwt = require('jsonwebtoken');
const JWT_SEC = 'thisisajwtsecret';
const Admin = require('../models/admin');

module.exports.isLoggedIn = async (req, res, next) => {
    try {

        const token = req.header('auth-token');
        if (!token) {
            res.status(401).send({ error: "Please Authenticate First" });
        }
        const tokenData = jwt.verify(JSON.parse(token), JWT_SEC);
        const admin = await Admin.findOne({ _id: tokenData.admin.id });
        if (!admin) {
            res.status(401).send({ error: "Please Authenticate First" });
        }
    } catch (e) {
        console.log(e);
        res.json({ error: 'An Error has Occured', message: e.message });
    }

    next();
}