var mongoose = require('mongoose');
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
		type : String
	},
	profileImage : {
		type : String
	}

});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser  = function(newUser, callback) {
	newUser.save(callback);
}