const authRoute = require('./auth.route');
const indexRoute = require('./index.route');
const accountRoute = require('./account.route');
const userRoute = require('./user.route');
const articleRoute = require('./article.route');
const authJwt = require('../middlewares/authJwt');

module.exports = (app) =>
{
    app.use('/auth', authRoute);
    app.use('/x', authJwt.authorization, indexRoute);
    app.use('/x/account', authJwt.authorization, accountRoute);
    app.use('/x/user', authJwt.authorization, userRoute);
    app.use('/x/article', authJwt.authorization, articleRoute);
}