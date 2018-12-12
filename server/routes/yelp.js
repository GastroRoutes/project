require('dotenv').config();
const express = require('express');
const router  = express.Router();
const axios = require('axios')

'use strict';


const yelp = require('yelp-fusion');

const client = yelp.client(process.env.API_KEY_YELP);

router.post('/yelp', (req,res)=>{
//recogemos el objeto restaurante del front enviado desde yelp.js (funcion get.restaurant())
    client.search({
        term: req.body.restaurant,
        location: 'Madrid'
      }).then(response => {
        res.status(200).json(response.jsonBody)
      }).catch(e => {
        console.log(e);
      });
})
module.exports = router;

