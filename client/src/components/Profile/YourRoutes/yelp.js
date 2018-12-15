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
      restaurant: {
        term: "",
        location: ""
      },

    };

  }

  handleFormSubmit = e => {
    e.preventDefault();
    const { term, location} = this.state.restaurant;
    this.getRestaurants( {term, location })
    .then(restaurant =>{
      console.log(restaurant)
      this.props.getRestaurants(restaurant)
      this.setState({...this.state, })
      // this.props.getRestaurant(restaurant.name) /// hay que tratarlo. Llega como array
    });
  }

  handleChange = e => {
    const { name, value } = e.target;
    console.log(name + value)
    let searchRestaurant = this.state.restaurant;
    searchRestaurant[name] = value;
    this.setState({...this.state, restaurant: searchRestaurant});
  };

  // Función que envía los datos al back, a la ruta /yelp
  getRestaurants = (term, location) => {
    return this.service.post("/yelp", {term, location})
    .then(response =>
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
            name="term"
            placeholder="Buscar restaurantes"
            onChange={e => this.handleChange(e)}
          />
          <input
            type="text"
            name="location"
            placeholder="Ubicación"
            onChange={e => this.handleChange(e)}
          />
          <input type="submit"/>
          {/* <input type="text" name="location" onChange={e => this.handleChange(e)} /> */}
        </form>
      </div>
    );
  }
}

export default InputYelp;