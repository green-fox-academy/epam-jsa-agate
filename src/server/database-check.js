'use strict';

const config = require('../../.database-config.json');
const MongoClient = require('mongodb').MongoClient;

const address = config.database.url;
const port = config.database.port;
const databaseName = config.database.databaseName;
const okStatus = {status: 'ok', database: 'ok'};
const errorStatus = {status: 'ok', database: 'error'};

const createDatabaseUrl = function () {
  return `${address}:${port}/${databaseName}`;
};

function databaseResponse(res, status) {
  return function () {
    res.json(status);
  }();
}

const checkDatabaseHealth = function (res, callback) {
  const url = createDatabaseUrl();
  MongoClient.connect(url, function (err, db) {
    if (err === null) {
      let collection = db.collection('heartbeat');
      collection.find({}).toArray(function (err, docs) {
        if (err === null && docs.length > 0) {
          callback(res, okStatus);
        } else {
          callback(res, errorStatus);
        }
      });
    } else {
      callback(res, errorStatus);
    }
    db.close();
  });
};

module.exports = {
  checkDatabaseHealth: checkDatabaseHealth,
  databaseResponse: databaseResponse
};
