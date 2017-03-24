const request = require('supertest');
var stockRepository = require("./stockRepository.mock")()

const app = require('../src/index')(stockRepository);

describe('Book inventory', function () {
    it('asdf asdf asdf asdf', function (done) {
        request(app)
            .post('/stock')
            .send({ isbn: "1234-1234", count: 12 })
            .expect({ isbn: "1234-1234", count: 12 }, done);
    });
});
