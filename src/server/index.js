const express = require('express');
const DatabaseHealth = require('./database-check');
const DatabasePostRegister = require('./database-post-register');
const BusinessessEndpoint = require('./business-endpoint');
const path = require('path');
const dbUtility = require('./db-utility');
const businessesJson = require('./businesses.json');

let bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
let jsonParser = bodyParser.json();

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

app.post('/api/register', jsonParser, function(req, res) {
  if (req.headers['content-type'] !== 'application/json') {
    res.json(contentTypeError);
    return;
  }
  if (!req.body.username) {
    res.status(400).send(userNameMissing);
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

app.listen(PORT, function() {
  console.log(`app is listening on port ${PORT}`);
});
