let passport = require('passport');
let jwTokenConfig = require('../../config').jwToken;
let jwt = require('jsonwebtoken');
let UserModel = require('../UserModel');

/**
 * Register user
 * @param {request} req 
 * @param {response} res 
 */
exports.register = async function (req, res, next) {
  try {
    // get request paramter
    let username = req.body.username;
    let password = req.body.password;

    // create the user
    var newUser = new UserModel();
    // set the user's local credentials
    newUser.username = username;
    newUser.password = newUser.generateHash(password);

    // save the user
    await newUser.save();

    // generate token
    let token = generateToken({
      username: username,
      password: password
    });

    // return json data
    res.json({
      success: true,
      token: token
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: ''
    });
  }
}

/**
 * login user
 * @param {request} req 
 * @param {response} res 
 */
exports.login = async function (req, res, next) {
  try {
    // get request paramter
    let username = req.body.username;
    let password = req.body.password;

    // get user info
    UserModel.findOne({username: username}, (err, user) => {
      if (err) {
        return res.status(500).send('Error on the server.');
      }

      if (!user) {
        return res.status(404).send('No user found.');
      }

      if (!user.isValidPassword(password)) {
        return res.status(401).send({ auth: false, token: null });
      }
      // generate token
      let token = generateToken({
        username: username,
        password: password
      });

      res.status(200).send({ auth: true, token: token });
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: ''
    });
  }
}

/**
 * Get user information
 * @param {*} req 
 * @param {*} res 
 */
exports.getUserInfo = async function(username = null) {
  // when search by username
  let searchCondition = {};
  let userInfo = {};
  if (username) {
    searchCondition.username = username;
    // find user info
    userInfo = await UserModel.find(searchCondition, { password: 0 });
  }

  return userInfo;
}

/**
 * create hash token
 * @param {user model} user 
 */
function generateToken(user) {
  let token = jwt.sign({ user: user }, jwTokenConfig.secret, {
    expiresIn: jwTokenConfig.expiresIn
  });
  console.log(token);
  return token;
}