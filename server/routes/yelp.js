require('dotenv').config();
const express = require('express');
const router  = express.Router();
const axios = require('axios')
'use strict';


const yelp = require('yelp-fusion');

const client = yelp.client(process.env.API_KEY_YELP);


router.get('/yelp', (req,res)=>{
    axios.get(`https://api.yelp.com/v3/businesses/search?term=${e.target.value}&location=Madrid`)
    .then(resApi => {
      this.setState({
        restaurant: resApi
      })
    })
    // client.search({
    //     term:req.query.q,
    //     location: req.query.q
    //   }).then(response => {
    //     res.json(response.jsonBody.businesses[0].name);
    //   }).catch(e => {
    //     res.status(500).json(e);
    //   });
})

module.exports = router