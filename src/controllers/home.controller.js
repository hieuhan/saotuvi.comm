const utils = require('../utils');

module.exports.index = async (request, response, next) => {
    response.render('index', { currentDate: utils.getdate() });
}