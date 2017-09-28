'use strict';

const config = require('../../.config.json');

const MongoClient = require('mongodb').MongoClient;
const address = config.express.database.url;
const port = config.express.database.port;
const databaseName = config.express.database.databaseName;
const okStatus = {status: 'ok', database: 'ok'};
const errorStatus = {status: 'ok', database: 'error'};

const createDatabaseUrl = function (address, port, databaseName) {
  return `${address}:${port}/${databaseName}`;
};

const checkDatabaseHealth = function(res) {
  let url = createDatabaseUrl(address, port, databaseName);
  MongoClient.connect(url, function(err, db) {
    if (err === null) {
      let collection = db.collection('heartbeat');
      collection.find({}).toArray(function(err, docs) {
        if (err === null && docs.length > 0) {
          res.json(okStatus);
        } else {
          res.json(errorStatus);
        }
      });
    } else {
      res.json(errorStatus);
    }
    db.close();
  });
};

module.exports = checkDatabaseHealth;
