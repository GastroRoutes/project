import React, { Component } from 'react'
import InputYelp from "./CreateRoutes/Yelp/yelp";
import YourRoutes from "./YourRoutes/YourRoutes";


export default class Profile extends Component {
  constructor(props){
    super(props)
  }

  render() {
    const showRestaurants = this.props.restaurant ? (
      <div>{this.props.restaurant}</div>
    ) : (
      <div>Search a restaurant!</div>
    );
    return (
      <div>
      {console.log(this.props.restaurant)}
        <h1>User</h1>
        Contenedor de Perfil
        <YourRoutes />
        <InputYelp
          getRestaurant={this.props.getRestaurant }
          handleFormSubmit={this.handleFormSubmit}
          handleChange={this.handleChange}
        />
        {showRestaurants}
      </div>
    )
  }
}
