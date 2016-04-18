var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var db = mongoose.connection;

mongoose.connect('mongodb://localhost/node_db');
var UserSchema = mongoose.Schema({
	name: {
		type : String,
		index : true 
	},
	email : {
		type : String
	},
	password : {
		type : String,
		required : true,
		bcrypt : true
	},
	profileImage : {
		type : String
	}

});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser  = function(newUser, callback) {
	bcrypt.hash(newUser.password, 10 , function(err, hash){
		if (err) throw err;
		newUser.password = hash;
		newUser.save(callback);
	});
}
module.exports.findId = function(id,callback){
	var query = {id: id};
	User.findById(id,callback);
}

module.exports.findUser = function(email,callback){
	var query = {email: email};
	User.findOne(query,callback);
}

module.exports.comparePassword  = function(password,hash, callback){
	bcrypt.compare(password,hash, function(err,isMatch){
		if (err) {return callback(err)};
		callback(null, isMatch);
	});
}