module.exports.index = async (request, response, next) => {
    response.render('admin', { title: 'Login Page', layout: './admin/layout' });
}