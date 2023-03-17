module.exports.index = async (request, response, next) => {
    response.render('admin/article/index', { title: 'Login Page', layout: './admin/layout' });
}

module.exports.create = async (request, response, next) => {
    response.render('admin/article/create', { title: 'Login Page', layout: './admin/layout' });
}