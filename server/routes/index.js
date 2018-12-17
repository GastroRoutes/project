const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.status(200).json()
});

router.use('/api/auth', require('./auth'));

router.use('/api/yelp', require('./yelp'));
router.use('/api/editProfile', require('./profile'));

router.use('/api/tracks', require('./tracks'));

router.use('/api/mapDirections', require('./mapDirections'));

module.exports = router;
