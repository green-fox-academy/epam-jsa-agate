const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
const DatabaseHealth = require('./database-check');
const BusinessessEndpoint = require('./business-endpoint');
const dbUtility = require('./db-utility');
const businessesJson = require('./businesses.json');
const login = require('./login');

const app = express();
const collectionName = 'businesses';
const PORT = process.env.PORT || 3000;
const dataFeedStatus = {insert: 'ok'};
const okStatus = {status: 'ok', database: 'ok'};
const errorStatus = {status: 'ok', database: 'error'};
const apiErrorMessage = {error: 'something went wrong'};
const JWTMiddleware = expressJWT({secret: 'epam jsa agate'});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

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

app.get('/login', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});

app.post('/api/login', (req, res) => {
  login.validation(req, (status) => {
    if (status === 0) {
      return res.status(400).
        json({error: 'content-type should be application/json'});
    } else {
      return res.status(400).json({error: 'usename and password required'});
    }
  });
  login.createTokenForExistingUser(req.body,
    console.log(req.body)
    (status) => {
      if (status === 2) {
        let Token = jwt.sign({username: req.body.username}, 'epam jsa agate');
        return res.status(200).json(Token);
      } else if (status === 3) {
        return res.status(403).json({error: 'bad credentials'});
      } else if (status === 4) {
        return res.status(500).send('something went wrong');
      }
    }
  );
});

app.use(express.static(path.resolve(__dirname, '../../dist')));

app.listen(PORT, function() {
  console.log(`app is listening on port ${PORT}`);
});
