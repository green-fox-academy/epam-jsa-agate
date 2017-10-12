const express = require('express');
const DatabaseHealth = require('./database-check');
const DatabasePostRegister = require('./database-post-register');
const BusinessessEndpoint = require('./business-endpoint');
const path = require('path');
const dbUtility = require('./db-utility');
const businessesJson = require('./businesses.json');

const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const collectionName = 'businesses';
const dataFeedStatus = {insert: 'ok'};
const PORT = process.env.PORT || 3000;
const okStatus = {status: 'ok', database: 'ok'};
const errorStatus = {status: 'ok', database: 'error'};
const apiErrorMessage = {error: 'something went wrong'};
const contentTypeError = {status: '400', description:
'request\'s content-type header is not set to application/json'};
const userNameMissing = {status: '400', description: 'username required'};
const passWordMissing = {status: '400', description: 'password required'};
const conflictUserName = {status: '409', description: 'conflict user name'};
const otherError = {status: '500', description: 'something else went wrong'};
const registerSuccess = {status: '201'};

const bcrypt = require('bcrypt');
const saltRounds = 10;
let generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds));
};

app.get('/feed', function(req, res) {
  dbUtility.insertFileToDatabase(businessesJson, collectionName);
  res.json(dataFeedStatus);
});

app.get('/heartbeat', function(req, res) {
  DatabaseHealth.checkDatabaseHealth((isWorking) => {
    isWorking ? res.json(okStatus) :
      res.json(errorStatus);
  });
});

app.get('/api/businesses', function(req, res) {
  BusinessessEndpoint.fetchBusinesses((isWorking, docs) => {
    if (isWorking) {
      let data = docs[0] ? docs[0].businesses : [];
      let businesses = {businesses: data};
      res.status(200).json(businesses);
    } else {
      res.status(500).json(apiErrorMessage);
    }
  });
});

app.use(express.static(path.resolve(__dirname, '../../dist')));

app.get(['/', '/login', '/register'], (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});

app.post('/api/register', function(req, res) {
  if (req.headers['content-type'] !== 'application/json') {
    return res.json(contentTypeError);
  }
  if (!req.body.username) {
    return res.status(400).send(userNameMissing);
  }
  if (!req.body.password) {
    return res.json(passWordMissing);
  }

  const passwordHash= generateHash(req.body.password);
  DatabasePostRegister.postRegister(req.body.username, passwordHash,
    (dbResponseStatus) => {
      if (dbResponseStatus === '409') {
        return res.json(conflictUserName);
      }
      if (dbResponseStatus === '500') {
        return res.json(otherError);
      }
      if (dbResponseStatus === '201') {
        return res.json(registerSuccess);
      }
    });
});

app.listen(PORT, function() {
  console.log(`app is listening on port ${PORT}`);
});
