var express = require('express')
var bodyParser = require('body-parser');
var app = express()
var getStock, getStockByISBN, postStock, putStock;

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
    // res.send('Hello World!')
    throw new Error('forced error');
})

// app.get('**', function (req, res, next) {
//   console.error("asdfasdf");
//   res.status(404).send("Somefing 404 ");
// }, function (req, res) {
//   res.send('Hello World!')
// })
app.use(function (req, res, next) {
    // console.error("asdfasdf");
    // res.status(404).send("Somefing 404 ");
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
// function logRequest(req, res, next) {
//   console.log('incoming request', new Date());
//   next();
// }
// function auth(req, res, next) {
//   console.log('please your pass');
//   next();
// }
// app.use(logRequest);
// app.use(auth);


// app.use(function (err, req, res, next) {
//   console.error(err.stack);
//   res.status(500).send("Somefing broke!");
// });
module.exports = function(stockRepository){
    getStock = stockRepository.getStock;
    getStockByISBN = stockRepository.getStockByISBN;
    postStock = stockRepository.postStock;
    putStock = stockRepository.putStock;
    return app;
};
