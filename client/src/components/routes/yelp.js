import React, { Component } from 'react';
import axios from "axios";

class InputYelp extends Component{
    constructor(props){
        super(props)
        this.service = axios.create({
            baseURL: "http://localhost:5000/yelp",
            withCredentials: true
          })
        this.state = {
            restaurant: ''
        }
    }
    getRestaurants = (restaurants) => {
        return this.service.post('/yelp', restaurants)
        .then(()=> console.log("soy la info de la api y estoy en yelp.js"))
        .then(response => response.data)

      }
    
    handleFormSubmit = (e) => {
        e.preventDefault();
        
        const {restaurant} = this.state;
         this.getRestaurants({restaurant})
        .then(restaurant => this.props.restaurants(restaurant));
      }
      
    // handleFormSubmit = (e, state) =>{
        
    //     e.preventDefault()
    //     const {restaurant} = this.state

    //     this.props.restaurant('/yelp', state)
    //     .then(response =>response.data)

    //     console.log(restaurant)
    //     axios.get(`http://localhost:5000/yelp`, {restaurant},  {withCredentials: true})
    //     .then(resApi => {
    //       this.setState({ restaurant: resApi, })
    //     })
    //     .catch( e => console.log(e))
    //   };

      handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value})
      } 
 

      render(){

          return (
          <div>
              <form onSubmit={e => this.handleFormSubmit(e, this.props.state)}>
              <input type="text" name="restaurant" onChange={e => this.handleChange(e)} />
              </form>
          </div>
          )
      }
}

export default InputYelp