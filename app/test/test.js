let request = require('supertest');
let app = require('../server.js');

/**
 * Test that root is accessible
 */
describe('Test that root is accessible', () => {
    test('It should response with success code', (done) => {
        request(app).get('/').then((response) => {
            expect(response.statusCode).toBe(400);
            done();
        });
    });
});

/**
 * Test that a request with wrong params returns ERROR
 */
describe('Test that a request with wrong params returns ERROR', ()=> {
    test('It shoud resposnse with error HTML', (done) => {
        request(app)
        .post('/')
        .send({ city: 'Unknown city'})
        .expect('Content-Type', /html/)
        .then(response => {
            expect(response.type).toEqual("text/html");
            expect(response.text).toMatch("<p>Error, please try again</p>");
            done()
        })
    });
});

/**
 * Test that a request with correct params returns result
 */
describe('Test that a request with correct params returns result', () => {
    test('It should resposnse with success HTML', (done) => {
       request(app)
        .post('/')
        .send({ city: 'Berlin'})
        .expect('Content-Type', /html/)
        .then(response => {
            expect(response.type).toEqual("text/html");
            expect(response.text).toMatch("degrees in Berlin");
            done();
        })
    });
    app.close(); // close app to prevent error of Jest not exiting after test completed
});
