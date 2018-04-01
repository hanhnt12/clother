var express = require('express');
var router = express.Router();

// api user routes
const apiUsersRoute = require('./api/users');

// use api user routes
router.use('/users', apiUsersRoute);

/* GET api route. */
router.get('/', function(req, res, next) {
  res.send('api route');
});

module.exports = router;
