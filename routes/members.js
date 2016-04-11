var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('members', { title: 'members' });
});

module.exports = router;
