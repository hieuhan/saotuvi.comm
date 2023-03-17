const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const articleRoute = require('./article.route');
const authJwt = require('../middlewares/authJwt');

module.exports = function(app)
{
    app.use('/auth', authRoute);
    app.use('/admin/user', authJwt.verifyToken, userRoute);
    app.use('/admin/article', authJwt.verifyToken, articleRoute);
}