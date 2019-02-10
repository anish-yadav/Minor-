var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//Schema 
var UserSchema = new mongoose.Schema({
    username :{
        type:String
    },
    email : {
        type:String
    },
    password : {
        type:String
    },
    masterPassword : {
        type:String
    }
});

var User = module.exports = mongoose.model('User', UserSchema);
User.createIndexes();

module.exports.createUser = (newUser, callback) =>{
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
          newUser.password = hash;
          newUser.save(callback);
        });
    });
}

User.getUserByUsername = (username, callback) =>{
    User.findOne({'username' : username},callback);
 }
