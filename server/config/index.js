// config database
const DB_HOST = process.env.DB_HOST || '127.0.0.1';
const DB_USER = process.env.DB_USER || '';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_PORT = process.env.DB_PORT || '27017';
const DB_NAME = process.env.DB_NAME || 'clother';
// const CONNECTION_STRING = 'mongodb://' + DB_USER + ':'
//   + DB_PASSWORD + '@'
//   + DB_HOST + ':'
//   + DB_PORT + '/'
//   + DB_NAME;
const CONNECTION_STRING = 'mongodb://localhost:27017/clother'
module.exports = {
  dbUrl: process.env.DB_URL || CONNECTION_STRING,
  jwToken: {
    secret: '$hanh12ntZZA<>"', // secret key to encode/decode token
    expiresIn: 60 * 60 * 3 * 1000, // expires in 3 hours 
    name: 'sessionID' // session name
  }
}