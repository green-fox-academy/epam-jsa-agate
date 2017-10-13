const responseMessage = {
  OK_Status: {status: 'ok', database: 'ok'},
  Error_Status: {status: 'ok', database: 'error'},
  API_Error_Message: {error: 'something went wrong'},
  ContentType_Error: {status: '400', description:
  'request\'s content-type header is not set to application/json'},
  Username_Missing: {status: '400', description: 'username required'},
  Password_Missing: {status: '400', description: 'password required'},
  Username_Conflict: {status: '409', description: 'conflict user name'},
  Other_Error: {status: '500', description: 'something else went wrong'},
  Register_Success: {status: '201'},
};

module.exports = responseMessage;
