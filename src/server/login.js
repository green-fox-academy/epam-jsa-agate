const dbUtility = require('./db-utility');
const bcrypt = require('bcrypt');

const collectionName = 'login';

const createTokenForExistingUser = function(body, callback) {
  const url = dbUtility.createDatabaseUrl();
  dbUtility.connectMongo(url, findUser(body, callback));
};

const findUser = function(body, callback) {
  return function(err, db) {
    if (err === null) {
      db.collection(collectionName).findOne({username: body.username},
        function(err, docs) {
          if (docs !== null) {
            const reqPassword = body.password;
            const queryPassword = docs.password;
            verifyPassword(reqPassword, queryPassword, callback);
          } else {
            return callback(3);
          }
        });
    } else {
      return callback(4);
    }
  };
};

const verifyPassword = function(reqPassword, queryPassword, callback) {
  if (bcrypt.compare(reqPassword, queryPassword)) {
    return callback(0);
  }
  return callback(3);
};

const validation = function(req, callback) {
  if (req.headers['content-type'] !== 'application/json') {
    return callback(1);
  }
  if (!req.body.username && !req.body.password) {
    return callback(2);
  }
};

module.exports={
  createTokenForExistingUser: createTokenForExistingUser,
  validation: validation,
};

