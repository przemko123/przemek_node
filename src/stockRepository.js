var MongoClient = require('mongodb').MongoClient;

var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/myproject';

var connectionPromis = MongoClient.connect(url, {
    bufferMaxEntries: 0
});

var collectionPromis = connectionPromis.then(function (db) {
    return db.collection('book-przemek');
});

function getStock() {
    return collectionPromis.then(function (collection) {
        return collection.find({}).toArray();
    });
}

function getStockByISBN(isbn) {
    return collectionPromis.then(function (collection) {
        return collection.find({ isbn }).limit(1).next();
    });
}

function postStock(value) {
    return collectionPromis.then(function (collection) {
        return collection.insertOne(value)
    });
}

function putStock(value) {
    return collectionPromis.then(function (collection) {
        return collection.updateOne({ isbn: value.isbn }, value)
    });
}

module.exports = {getStock, getStockByISBN, postStock, putStock};
