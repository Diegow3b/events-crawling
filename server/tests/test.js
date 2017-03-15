var request = require('supertest');
var app = require('./../app');

var tearDown = () => {
    // FlushDB
}

var config = () => {
    //Initial DB Data
}

/**
 * Root Path Test
 */
describe('Requests to the root path', () => {

    it('Returns a 200 status code', (done) => {
        request(app)
            .get('/')
            .expect(200, done)
    });

    it('Returns a HTML format', (done) => {
        request(app)
            .get('/')
            .expect('Content-Type', /html/, done)
    });

});

/**
 * Api Eventos Test
 */
describe('Listing eventos on api/eventos', () => {
    it('Return 200 status code', (done) => {
        request(app)
            .get('/api/eventos')
            .expect(200, done);
    });

    it('Return JSON format', (done) => {
        request(app)
            .get('/api/eventos')
            .expect('Content-Type', /json/, done);            
    });
    
});