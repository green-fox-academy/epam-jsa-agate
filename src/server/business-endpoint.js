'use strict';

const dbUtility = require('./db-utility');
const MongoClient = require('mongodb').MongoClient;
let ObjectID = require('mongodb').ObjectID;
const collectionName = 'businesses';

let objectId = ObjectID;

function fetchBusinesses(callback) {
  const url = dbUtility.createDatabaseUrl();

  MongoClient.connect(url, function(err, db) {
    if (err === null) {
      let collection = db.collection(collectionName);

      collection.find({}).toArray(function(err, docs) {
        if (err === null) {
          return callback(true, docs);
        }
        return callback(false);
      });
    } else {
      return callback(false);
    }
    db.close();
  });
}

function fetchSingleBusiness(searchId, callback) {
  const url = dbUtility.createDatabaseUrl();
  const filter = {_id: objectId(searchId)};
  const ZERO = 0;

  MongoClient.connect(url, function(err, db) {
    if (err === null) {
      let collection = db.collection(collectionName);

      collection.find(filter).toArray(function(err, docs) {
        db.close();
        if (docs.length !== ZERO && !err) {
          return callback('200', docs);
        }
        return callback('404');
      });
    } else {
      return callback('500');
    }
  });
}

module.exports = {
  fetchBusinesses: fetchBusinesses,
  fetchSingleBusiness: fetchSingleBusiness,
};
