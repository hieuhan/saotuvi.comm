const config = require('../../config/auth.config');
const jwt = require("jsonwebtoken");

module.exports.authorization = (req, res, next) => {
    try {
        const token = req.cookies.access_token;

        if (!token) {
            return res.redirect('/auth/login');
        }

        const data = jwt.verify(token, config.JWT_SECRET_KEY);
        req.userId = data.id;
        //req.userRole = data.role;
        console.log(data);
        return next();

    } catch (error) {
        next(error);
    }
};