
module.exports = function (stockRepository) {
    var getStock = stockRepository.getStock;
    var getStockByISBN = stockRepository.getStockByISBN;
    var postStock = stockRepository.postStock;
    var putStock = stockRepository.putStock;

    return {
        hello: function (req, res) {
            res.send('Hello World!');
        },
        getStock: function (req, res, next) {
            getStock().then(function (bookArray) {
                res.send(bookArray);
            }).catch(next);
        },
        getStockByISBN: function (req, res, next) {
            var isbn = req.params['isbn'];
            getStockByISBN(isbn).then(function (bookArray) {
                if (bookArray) {
                    res.send(bookArray);

                } else {
                    res.status(404).send("asdf asdfa asdf");
                }
            }).catch(next);
        },
        postStock: function (req, res, next) {
            postStock(req.body).then(function () {
                res.json({
                    isbn: req.body.isbn,
                    count: req.body.count
                })
            }).catch(next);
        },
        putStock: function (req, res, next) {
            putStock(req.body).then(function () {
                res.json({
                    isbn: req.body.isbn,
                    count: req.body.count
                })
            }).catch(next);
        }
    }
}
