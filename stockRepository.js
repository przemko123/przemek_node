var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/myproject';

var connectionPromis = MongoClient.connect(url, {
    bufferMaxEntries: 0
});

var collectionPromis = connectionPromis.then(function (db) {
    return db.collection('book');
});

function getStock() {
    return collectionPromis.then(function (collection) {
        return collection.find({}).toArray();
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

module.exports = {getStock, postStock, putStock};
