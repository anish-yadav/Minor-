var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var cryptoJs = require('crypto-js')

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
    },
    salt : {
        type:String
    },
    passwords :{
        facebook: {type:String},
        github: {type:String},
        twitter :{type:String},
        linkedIn : {type:String}
    }
});

var User = module.exports = mongoose.model('User', UserSchema);
User.createIndexes();

module.exports.createUser = (newUser, callback) =>{
    bcrypt.genSalt(10, function(err, salt) {
        newUser.salt = salt;
         
        bcrypt.hash(newUser.masterPassword, salt, function(err, hash) {
            newUser.password = bcrypt.hashSync(newUser.password,salt);
            newUser.masterPassword = hash; 
            newUser.save(callback);
          });
    });
    
    
}
module.exports.updateUser = (newUser,callback) => {
    User.findOne({'username':newUser.username},(err,user) => {
        if (user) {
            user = newUser;
            user.save(callback)
        }
    })
}

User.getUserByUsername = (username, callback) =>{
    User.findOne({'username' : username},callback);
 }
