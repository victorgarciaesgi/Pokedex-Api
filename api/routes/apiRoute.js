module.exports = function(app) {
    let api = require('../controllers/apiController');

    app.route('/api')
        .get(api.index);

    app.route('/api/login')
        .post(api.login);
};