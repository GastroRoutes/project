import React, { Component } from "react";
import axios from "axios";

class InputYelp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: {
        term: "",
        location: ""
      },
      preload: false
    };
  }
  handleFormSubmit = e => {
    e.preventDefault();
    const { term, location } = this.state.restaurant;
    this.props.getRestaurants({ term, location }).then(restaurant => {
      this.props.sendRestaurants(restaurant);
      // this.props.getRestaurant(restaurant.name) /// hay que tratarlo. Llega como array
    });
  };

  handleChange = e => {
    const { name, value } = e.target;

    let searchRestaurant = this.state.restaurant;
    searchRestaurant[name] = value;
    this.setState({
      ...this.state,
      restaurant: searchRestaurant,
    });
  };


  render() {
    
    return (
      <div>

        <form
          className="center-form-yelp"
          onSubmit={e => this.handleFormSubmit(e, this.props.state)}
        >
          <input
            type="text"
            name="term"
            placeholder="Buscar restaurantes"
            onChange={e => this.handleChange(e)}
            autoComplete="off"
          />
          <input
            type="text"
            name="location"
            placeholder="Ubicación"
            onChange={e => this.handleChange(e)}
            autoComplete="off"
          />
          <input value="Buscar restaurantes" type="submit" />
          {/* <input type="text" name="location" onChange={e => this.handleChange(e)} /> */}
        </form>
      </div>
    );
  }
}

export default InputYelp;
