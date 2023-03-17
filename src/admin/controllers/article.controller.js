module.exports.index = async (request, response, next) => {
    response.render('admin/article/index', { title: 'Login Page', layout: './admin/layout' });
}