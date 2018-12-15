const express = require('express');
const router  = express.Router();
const axios = require('axios')

'use strict';


router.post('/', (req,res)=>{
    axios.get('http://maps.googleapis.com/maps/api/directions/json?',{
      params:{
        origin:"Madrid",
        destination:"Oviedo",
        key:'AIzaSyB8NzS5RBf23YH2cAwWi8t0HlpwPfqB6no'
      }
    })
    .then(function(response){
      console.log(response)
    })
    .catch(function(error){
      console.log('Entra en el catch');
    })
  });

module.exports = router;