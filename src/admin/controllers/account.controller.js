module.exports.profile = async (request, response, next) => {
    response.render('admin/account/profile', { title: 'Login Page', layout: './admin/layout' });
}