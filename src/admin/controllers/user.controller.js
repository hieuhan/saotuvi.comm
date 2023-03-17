module.exports.index = async (request, response, next) => {
    response.render('admin/user/index', { title: 'Login Page', layout: './admin/layout' });
}