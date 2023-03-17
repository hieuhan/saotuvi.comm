module.exports.login = async (request, response, next) => {
    response.render('admin/auth/login', { title: 'Login Page', layout: './admin/layout' });
}

module.exports.profile = async (request, response, next) => {
    response.render('admin/auth/profile', { title: 'Login Page', layout: './admin/layout' });
}