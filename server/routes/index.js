const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.use('/api/auth', require('./auth'));

router.use('/yelp', require('./yelp'));
router.use('/editProfile', require('./profile'));

router.use('/tracks', require('./tracks'));

router.use('/mapDirections', require('./mapDirections'));

module.exports = router;
