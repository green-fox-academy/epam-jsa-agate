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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(expressJWT({secret: 'epam jsa agate'}).unless({
  path: ['/feed', '/heartbeat', '/api/businesses', '/login'],
}));

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

app.post('/login', (req, res) => {
  if (req.headers['content-type'] !== 'application/json') {
    res.status(400).send('application/json as content-type');
    return;
  }
  if (!req.body.username) {
    res.status(400).send('username required');
    return;
  }
  if (!req.body.password) {
    res.status(400).send('password required');
    return;
  }
  login.creatTokenForExistedUser(req.body.username,
    (caseOfUser) => {
      console.log(caseOfUser);
      let Token = jwt.sign({username: req.body.username}, 'epam jsa agate');
      switch (caseOfUser) {
      case 500: res.status(500).send('something went wrong'); break;
      case req.body.password: res.status(200).json(Token); break;
      default: res.status(403).json({error: 'bad credentials'});
      }
    }
  );
});

app.use(express.static(path.resolve(__dirname, '../../dist')));

app.listen(PORT, function() {
  console.log(`app is listening on port ${PORT}`);
});
