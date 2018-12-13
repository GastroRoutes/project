import React, { Component } from "react";
import YourRoutes from "../YourRoutes/YourRoutes";
// import YourRoutes from "./YourRoutes/YourRoutes";

export default class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const showRestaurants = this.props.restaurant ? (
      <div>{this.props.restaurant}</div>
    ) : (
      <div>Search a restaurant!</div>
    );
    return (
      <div>
        {console.log("estado de restaurant: " + this.props.restaurant)}
        <h1>User</h1>
        Contenedor de Perfil
        <YourRoutes
          getRoute={this.props.getRoute}
          getRestaurant={this.props.getRestaurant}
          handleFormSubmit={this.handleFormSubmit}
          handleChange={this.handleChange}
        />
        {showRestaurants}
      </div>
    );
  }
}
