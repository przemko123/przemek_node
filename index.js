var express = require('express')
var bodyParser = require('body-parser');
var app = express()
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/myproject';

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World!')

  // MongoClient.connect(url, function (err, db) {
  //   console.log("Connected successfully to server");
  //   var book = db.collection('book');
  //   var bookArray = book.find({}).toArray(
  //     function(err, bookArray) {
  //       res.send(bookArray);
  //     }
  //   );
  //   // console.log(bookArray);

  //   db.close()
  // });
})

app.get('/stock', function (req, res) {
  // res.send('Hello World!')

  MongoClient.connect(url, function (err, db) {
    console.log("Connected successfully to server");
    var book = db.collection('book');
    var bookArray = book.find({}).toArray(
      function (err, bookArray) {
        res.send(bookArray);
      }
    );
    // console.log(bookArray);

    db.close()
  });
})

app.post('/stock', function (req, res, next) {

  MongoClient.connect(url, function (err, db) {
    console.log("Connected stock");
    db.collection('book')
      .insertOne(req.body)

    db.close()
  });
  res.json({
    isbn: req.body.isbn,
    count: req.body.count
  })
})
app.put('/stock', function (req, res, next) {

  MongoClient.connect(url, function (err, db) {
    console.log("Connected put stock");
    db.collection('book')
      .updateOne({ isbn: req.body.isbn }, req.body)

    db.close()
  });
  res.json({
    isbn: req.body.isbn,
    count: req.body.count
  })
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
module.exports = app;