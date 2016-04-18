var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });


var User = require('../models/register');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'register' });

  

});

router.post('/', upload.single('profileImage'), function(req,res,next){
	var fullName = req.body.fullName;
	var email = req.body.email;
	var password = req.body.password;
	var password2 = req.body.password2;

	if (req.file) {
		console.log('now uploading...');
		debugger;
		var profileImageOriginalName = req.files.profileImage.originalname;
		var profileImageName = req.files.profileImage.name;
		var profileImageMime = req.files.profileImage.mimetypes;
		var profileImagePath = req.files.profileImage.path;
		var profileImageExt = req.files.profileImage.extension;
		var profileImageExt = req.files.profileImage.size;
		res.end();
	} else {
		//default 
		var profileImage = '/images/no-user-image.gif';
	}

	//validation 
	req.checkBody('fullName','Name field is required').notEmpty();
	req.checkBody('email','Name field is not valid').isEmail();
	req.checkBody('password','Password field is required').notEmpty();
	req.checkBody('password2','Password do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if (errors) {
		res.render('register', {
			errors : errors,
			name : fullName,
			email : email,
			password : password,
			password2 : password2
		});
	} else {
		var newUser = new User({
			name : fullName,
			email : email,
			password : password,
			profileImage : profileImageName
		});

		User.createUser(newUser, function(err, user){
			if (!err) {
				console.log(user);
				console.log('succeessfully registered');
			} else {
				console.log(err);
			}

			req.flash('redirecting now');
			res.location('/success');
			res.redirect('/success');
		});
		

	}
});

module.exports = router;
