const responseMessage = {
  okStatus: {status: 'ok', database: 'ok'},
  errorStatus: {status: 'ok', database: 'error'},
  apiErrorMessage: {error: 'something went wrong'},
  contentTypeError: {status: '400', description:
  'request\'s content-type header is not set to application/json'},
  userNameMissing: {status: '400', description: 'username required'},
  passWordMissing: {status: '400', description: 'password required'},
  conflictUserName: {status: '409', description: 'conflict user name'},
  otherError: {status: '500', description: 'something else went wrong'},
  registerSuccess: {status: '201'},
};

module.exports = responseMessage;
