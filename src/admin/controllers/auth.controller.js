const User = require('../models/user.model');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const config = require('../../config/auth.config');
const { check, validationResult, matchedData } = require('express-validator')

module.exports.login = async (request, response, next) => {
    // let errors = {};
    // try {
    //     var d = await User.create({
    //         username: 'admin',
    //         password: '111111',
    //         email: 'sffsdfdf',
    //         phone: 'ewfffewfe'
    //     });
    // } catch (error) {
    //     if (error.name === "ValidationError"){
            

    //         Object.keys(error.errors).forEach((key) => {
    //           errors[key] = error.errors[key].message;
    //         });
    //         const message = Object.values(error.errors).map(value => value.message);

    //         return response.render('admin/auth/login', { title: 'Login Page', errors: message, layout: './admin/layouts/auth' });
    //         //return response.status(400).send(errors);
    //     }else{
    //         next(error);
    //     }
    // }
    
    // const salt = await bcrypt.genSalt(config.SALT_FACTOR);

    // const hash = await bcrypt.hash('111111', salt);

    //console.log(d)

    response.render('admin/auth/login', { title: 'Login Page', layout: './admin/layouts/auth' });
}

module.exports.postLogin = async (request, response, next) => {
    try {

        const errors = validationResult(request);
        const { username, password } = request.body;
        //console.log(errors.errors)
        let errMsg = '';
        if (errors.isEmpty()) {
            //response.json(errors)
            var inputData = matchedData(request);  
        
            var user = await User.findOne({
                username: username
            });

            if(user)
            {
                var passwordIsValid = bcrypt.compareSync(
                    password,
                    user.password
                );

                if (!passwordIsValid) {
                    errors.password = { 'msg' : 'Mật khẩu không chính xác.' }
                }

                var token = jwt.sign({ id: user.id }, config.JWT_SECRET_KEY, {
                    expiresIn: 86400 // 24 hours
                });

                response.cookie("access_token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    maxAge: 3600000
                });
                
                return response.redirect('/x');
            }
            else{
                errors.password = { 'msg' : 'Mật khẩu không chính xác.' };
                console.log(errors);
            }
        }
        else{
            errMsg= errors.mapped();
            var inputData = matchedData(request);  
        }
        //console.log(inputData);
        response.render('admin/auth/login', { title: 'Login Page', errors: errMsg, inputData : inputData, layout: './admin/layouts/auth' });
    } catch (error) {
        next(error);
    }
}

module.exports.logout = async (request, response, next) => {
    try {
        response.clearCookie('access_token');
        return response.redirect('/');
    } catch (error) {
        next(error);
    }
}