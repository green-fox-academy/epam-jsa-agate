'use strict';
const MongoClient = require('mongodb').MongoClient;

const createDatabaseUrl = function() {
  const address = process.env.DB_URL;
  const port = process.env.DB_PORT;
  const databaseName = process.env.DB_NAME;
  return `${address}:${port}/${databaseName}`;
};

const insertFileToDatabase = function (file) {
  
}
module.exports = {
  createDatabaseUrl: createDatabaseUrl,
};
