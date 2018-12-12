import React, { Component } from "react";
import axios from "axios";

class InputYelp extends Component {
  constructor(props) {
    super(props);
    this.service = axios.create({
      baseURL: "http://localhost:5000/yelp",
      withCredentials: true
    });
    this.state = {
      restaurant: ""
      // location: ''
    };
  }

  handleFormSubmit = e => {
    e.preventDefault();
    const { restaurant } = this.state;
    this.getRestaurants({ restaurant })
    .then(restaurant =>{
      console.log(restaurant)
      this.props.restaurants(restaurant.name)
    }
    );
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  // Función que envía los datos al back, a la ruta /yelp
  getRestaurants = restaurants => {
    return this.service.post("/yelp", restaurants)
    .then(response =>
      // response)
        {
        return response.data.map((e)=>{
        return {e} 
           })
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={e => this.handleFormSubmit(e, this.props.state)}>
          <input
            type="text"
            name="restaurant"
            onChange={e => this.handleChange(e)}
          />
          {/* <input type="text" name="location" onChange={e => this.handleChange(e)} /> */}
        </form>
      </div>
    );
  }
}

export default InputYelp;
