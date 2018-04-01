// const config = require('../config/config');
const UserService = require('../models/services/UserService');

/**
 * validate when submit register api
 * @param {request} req 
 * @param {response} res 
 * @param {next middleware} next 
 */
exports.validateRegister = async function (req, res, next) {
  let username = req.body.username;
  let password = req.body.password;

  let error = false;
  let item = '';
  let message = '';

  if (!username) {
    error = true;
    item = 'username';
    message = 'Vui lòng nhập username.';
  }

  if (!error && !password) {
    error = true;
    item = 'password';
    message = 'Vui lòng nhập password.';
  }

  if (!error && (username.length < 4 || username.length > 50)) {
    error = true;
    item = 'username';
    message = 'Username phải có ít nhất 4 ký tự và không được vượt quá 50 ký tự.';
  }

  if (!error && password.length < 4) {
    error = true;
    item = 'password';
    message = 'Password phải có ít nhất 4 ký tự.';
  }

  // validate character
  const regex = /^[a-zA-Z0-9]{4,50}$/
  if (!error && !regex.test(username)) {
    error = true;
    item = 'username';
    message = 'Username phải là số hoặc chữ.';
  }

  // check exist user
  if (!error) {
    try {
      let userInfo = await UserService.getUserInfo(username)
      
      if (userInfo.length > 0) {
        error = true;
        message = 'Username đã tồn tại.'
      }
    } catch (err) {
      error = true;
      console.log(err);
      message = "Unexpected error occurs."
    }
  }

  // if have not any error
  if (error) {
    res.json({
      success: false,
      item: item,
      message: message
    });
  } else {
    next();
  }
}