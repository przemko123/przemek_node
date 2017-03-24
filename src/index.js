var express = require('express')
var bodyParser = require('body-parser');

module.exports = function (stockRepository) {
    var app = express();
    var routes = require('./routes')(stockRepository);
    var error = require('./error');

    app.use(bodyParser.json());

    app.get('/', routes.hello)

    app.get('/stock', routes.getStock)
    app.get('/stock/:isbn', routes.getStockByISBN)
    app.post('/stock', routes.postStock)
    app.put('/stock', routes.putStock)

    app.use(error.clientError);
    app.use(error.serverError);

    return app;
};
