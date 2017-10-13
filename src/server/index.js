const responseMessage = require('./responseMessage.js');
const express = require('express');
const DatabaseHealth = require('./database-check');
const Register = require('./database-post-register');
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
    isWorking ? res.json(responseMessage.OK_Status) :
      res.json(responseMessage.Error_Status);
  });
});

app.get('/api/businesses', function(req, res) {
  BusinessessEndpoint.fetchBusinesses((isWorking, docs) => {
    if (isWorking) {
      let data = docs[0] ? docs[0].businesses : [];
      let businesses = {businesses: data};
      res.status(200).json(businesses);
    } else {
      res.status(500).json(responseMessage.API_Error_Message);
    }
  });
});

app.use(express.static(path.resolve(__dirname, '../../dist')));

app.get(['/', '/login', '/register'], (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});

app.post('/api/register', function(req, res) {
  if (req.headers['content-type'] !== 'application/json') {
    return res.json(responseMessage.ContentType_Error);
  }
  if (!req.body.username) {
    return res.json(responseMessage.Username_Missing);
  }
  if (!req.body.password) {
    return res.json(responseMessage.Password_Missing);
  }

  const passwordHash = generateHash(req.body.password);
  Register.handleInfo(req.body.username, passwordHash,
    (dbResponseStatus) => {
      if (dbResponseStatus === '409') {
        return res.json(responseMessage.Username_Conflict);
      }
      if (dbResponseStatus === '500') {
        return res.json(responseMessage.Other_Error);
      }
      if (dbResponseStatus === '201') {
        return res.json(responseMessage.Register_Success);
      }
    });
});

app.listen(PORT, function() {
  console.log(`app is listening on port ${PORT}`);
});
