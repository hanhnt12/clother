let express = require('express');
let router = express.Router();
let userController = require('../../controllers/UserController');
let userService = require('../../models/services/UserService');
let jwTokenConfig = require('../../config').jwToken;
let jwt = require('jsonwebtoken');

/**
 *  REGISTER user 
*/
router.post('/register', userController.validateRegister, userService.register);

/**
 * LOGIN user 
 */
router.post('/login', userService.login);

/**
 * LOGOUT user 
 */
router.get('/logout', function(req, res, next) {
  res.status(200).send({ auth: false, token: null });
});

/**
 * Test token
 */
router.get('/me', function (req, res, next) {
  let token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  }

  jwt.verify(token, jwTokenConfig.secret, function (err, decoded) {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }

    // Get user info
    userService.getUserInfo(decoded.user.username)
    .then(user => {
      if (!user) {
        return res.status(404).send("No user found.");
      }
      res.status(200).send(user);
    })
    .catch(err => res.status(500).send("There was a problem finding the user."));
  });
});

module.exports = router;
