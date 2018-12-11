import React, { Component } from 'react';
import axios from 'axios';

class InputYelp extends Component{
    constructor(){
        super()
        this.state = {
            restaurant: null
        }
    }

    handleFormSubmit = (e) =>{
        e.preventDefault()
        axios.get(`http://localhost:5000/yelp?q=${e.target.value}`)
        .then(resApi => {
          this.setState({
            restaurant: resApi
          })
        })
        .catch( e => console.log(e) )
      };


      handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value})
      } 

      render(){

          return (
          <div>
              <form onSubmit={e => this.handleFormSubmit(e)}>
              <input type="text" name="restaurant" onChange={e => this.handleChange(e)} />
              </form>
          </div>
          )
      }
}

export default InputYelp