const responseMessage = require('./responseMessage.js');
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
    isWorking ? res.json(responseMessage.okStatus) :
      res.json(responseMessage.errorStatus);
  });
});

app.get('/api/businesses', function(req, res) {
  BusinessessEndpoint.fetchBusinesses((isWorking, docs) => {
    if (isWorking) {
      let data = docs[0] ? docs[0].businesses : [];
      let businesses = {businesses: data};
      res.status(200).json(businesses);
    } else {
      res.status(500).json(responseMessage.apiErrorMessage);
    }
  });
});

app.use(express.static(path.resolve(__dirname, '../../dist')));

app.get(['/', '/login', '/register'], (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});

app.post('/api/register', function(req, res) {
  if (req.headers['content-type'] !== 'application/json') {
    return res.json(responseMessage.contentTypeError);
  }
  if (!req.body.username) {
    return res.json(responseMessage.userNameMissing);
  }
  if (!req.body.password) {
    return res.json(responseMessage.passWordMissing);
  }

  const passwordHash= generateHash(req.body.password);
  DatabasePostRegister.postRegister(req.body.username, passwordHash,
    (dbResponseStatus) => {
      if (dbResponseStatus === '409') {
        return res.json(responseMessage.conflictUserName);
      }
      if (dbResponseStatus === '500') {
        return res.json(responseMessage.otherError);
      }
      if (dbResponseStatus === '201') {
        return res.json(responseMessage.registerSuccess);
      }
    });
});

app.listen(PORT, function() {
  console.log(`app is listening on port ${PORT}`);
});
