require('dotenv').config();
const express = require('express');
const router  = express.Router();
const axios = require('axios')
'use strict';


const yelp = require('yelp-fusion');

const client = yelp.client(process.env.API_KEY_YELP);

router.post('/yelp', (req,res)=>{

    client.search({
        term: req.body.restaurant,
        location: 'Madrid'
      }).then(response => {
        console.log(response.jsonBody.businesses);
      }).catch(e => {
        console.log(e);
      });
    // console.log(req.body.restaurant)
    // axios.get(`https://api.yelp.com/v3/businesses/search?term=${req.body.restaurant}&location=Madrid`)
    
    // .then(resApi => {
    //     console.log(resApi)
    //     this.setState({
    //         restaurant: resApi
    //     })
    // })
    // .catch(e => console.log(e))
})
module.exports = router
//  axios.get(`https://api.yelp.com/v3/businesses/search?term=${e.target.value}&location=Madrid`)
// .then(resApi => {
//   this.setState({
//     restaurant: resApi
//   })
// })