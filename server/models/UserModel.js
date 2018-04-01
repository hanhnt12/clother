var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define schema for use model
var userSchema = mongoose.Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  isAdmin: {type: Boolean, default: false},
  createDate: {type: Date, default: Date.now},
  updateDate: {type: Date}
});

// generate hash
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// check if password is valid
userSchema.methods.isValidPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);