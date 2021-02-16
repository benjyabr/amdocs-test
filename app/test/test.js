let request = require('supertest');
let app = require('../server.js');

let res = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Test</title>
    <link rel="stylesheet" type="text/css" href="/css/style.css">
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:300' rel='stylesheet' type='text/css'>
  </head>
  <body>
    <div class="container">
      <fieldset>
        <form action="/" method="post">
          <input name="city" type="text" class="ghost-input" placeholder="Enter a City" required>
          <input type="submit" class="ghost-button" value="Get Weather">
        </form>



          <p>Error, please try again</p>

      </fieldset>
    </div>
  </body>
</html>`

describe('GET /', function(){
  it('respond with html', function(done){
    request(app)
      .get('/')
      .expect(200, done);
  })
  it('respond with html', function(done){
    request(app)
      .post('/')
      .send({city: 'amsterdam'})
      .expect('Content-Type', /html/)
      .then(response => {
        console.log(response.text)
        response.text === res
        done()
      })
  })
})