var express = require('express')
var bodyParser = require('body-parser');

module.exports = function (stockRepository) {
    var app = express();
    var getStock = stockRepository.getStock;
    var getStockByISBN = stockRepository.getStockByISBN;
    var postStock = stockRepository.postStock;
    var putStock = stockRepository.putStock;

    app.use(bodyParser.json());

    app.get('/', function (req, res) {
        res.send('Hello World!')
    })

    app.get('/stock', function (req, res, next) {
        getStock().then(function (bookArray) {
            res.send(bookArray);
        }).catch(next);
    })

    app.get('/stock/:isbn', function (req, res, next) {
        var isbn = req.params['isbn'];
        getStockByISBN(isbn).then(function (bookArray) {
            if (bookArray) {
                res.send(bookArray);

            } else {
                res.status(404).send("asdf asdfa asdf");
            }
        }).catch(next);
    })

    app.post('/stock', function (req, res, next) {
        postStock(req.body).then(function () {
            res.json({
                isbn: req.body.isbn,
                count: req.body.count
            })
        }).catch(next);
    })

    app.put('/stock', function (req, res, next) {
        putStock(req.body).then(function () {
            res.json({
                isbn: req.body.isbn,
                count: req.body.count
            })
        }).catch(next);
    })

    app.get('/error', function (req, res) {
        throw new Error('forced error');
    })

    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });


    app.use(function (err, req, res, next) {
        var status = err.status || 500;
        res.status(status);
        console.error(err.stack);
        res.send('Oh no: ' + status);
    });

    return app;
};
