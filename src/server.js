var stockRepository = require("./stockRepository")
var app = require('./index')(stockRepository);

var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Example app listening on port 3000!')
})
