'use strict';

const config = require('../../.database-config.json');
const MongoClient = require('mongodb').MongoClient;

const okStatus = {status: 'ok', database: 'ok'};
const errorStatus = {status: 'ok', database: 'error'};

const createDatabaseUrl = function () {
  const address = config.database.url;
  const port = config.database.port;
  const databaseName = config.database.databaseName;
  return `${address}:${port}/${databaseName}`;
};

const checkDatabaseHealth = function (callback) {
  const url = createDatabaseUrl();
  MongoClient.connect(url, function (err, db) {
    let isWorking;
    if (err === null) {
      let collection = db.collection('heartbeat');
      collection.find({}).toArray(function (err, docs) {
        if (err === null && docs.length > 0) {
          isWorking = true;
          callback(isWorking);
        } else {
          isWorking = false;
          callback(isWorking);
        }
      });
    } else {
      isWorking = false;
      callback(isWorking);
    }
    db.close();
  });
};

module.exports = {
  checkDatabaseHealth: checkDatabaseHealth,
  okStatus: okStatus,
  errorStatus: errorStatus
};
