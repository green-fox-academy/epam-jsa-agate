const express = require('express');
const DatabaseHealth = require('./database-check');
const DatabasePostRegister = require('./database-post-register');
const path = require('path');

let bodyParser = require('body-parser');
let expressJWT = require('express-jwt');
let jwt = require('jsonwebtoken');

const app = express();

app.use(bodyParser.urlencoded());
app.use(expressJWT({secret: 'nyancat 4 ever'}).
  unless({path: ['/login', '/api/cats']}));

// const PORT = process.env.PORT || 3000;
const PORT = 3000;
const okStatus = {status: 'ok', database: 'ok'};
const errorStatus = {status: 'ok', database: 'error'};
const contentTypeError = {status: '400', description:
 'request\'s content-type header is not set to application/json'};
const userNameMissing = {status: '400', description: 'username required'};
const passWordMissing = {status: '400', description: 'password required'};
const conflictUserName = {status: '409', description: 'conflict user name'};
const otherError = {status: '500', description: 'something else went wrong'};
const registerSuccess = {status: '201'};
app.get('/heartbeat', function(req, res) {
  DatabaseHealth.checkDatabaseHealth((isWorking) => {
    isWorking ? res.json(okStatus) :
      res.json(errorStatus);
  });
});

app.post('/api/register', function(req, res) {

  if (req.headers['Content-Type'] !== 'application/json') {
    res.json(contentTypeError);
    return;
  }
  if (!req.body.username) {
    res.json(userNameMissing);
    return;
  }
  if (!req.body.password) {
    res.json(passWordMissing);
    return;
  }

  DatabasePostRegister.postRegister(req.body, (dbResponseStatus) => {
    if (dbResponseStatus === '409') {
      res.json(conflictUserName);
      return;
    }
    if (dbResponseStatus === '500') {
      res.json(otherError);
      return;
    }
    if (dbResponseStatus === '201') {
      res.json(registerSuccess);
      return;
    }
  });
});

app.use(express.static(path.resolve(__dirname, '../../dist')));

app.listen(PORT, function() {
  console.log(`app is listening on port ${PORT}`);
});
