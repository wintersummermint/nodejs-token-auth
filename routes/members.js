var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', ensureAuthenticated , function(req, res, next) {
  res.render('members', { title: 'members' });
});

function ensureAuthenticated(req,res,next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
};

module.exports = router;
