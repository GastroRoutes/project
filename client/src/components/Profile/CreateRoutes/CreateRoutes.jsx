import React, { Component } from "react";
import InputYelp from "../YourRoutes/yelp";
import axios from "axios";
export default class CreateRoutes extends Component {
  constructor() {
    super();
    this.state = {
      createRoutes: {
        routesName: "",
        category: "",
        routesType: ""
      },
      restaurant: null
    };

    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/tracks`,
      withCredentials: true
    });
  }
  handleFormSubmit = e => {
    e.preventDefault();
    const { routesName, category, routesType, photo } = this.state.createRoutes;
    this.getRoute({ routesName, category, routesType, photo })
    .then(route => {
      console.log(route.data);
      //   let id = route.data._id;
      this.props.createRoutes(route.data);
      this.setState({ ...this.props.state, createRoutes: null });
      // this.setState({ ...this.state, id }); /// hay que tratarlo. Llega como array
    });
  };

  // handleChangeCREATE = e => {
  //   const { name, value } = e.target;
  //   let newRoute = this.state.createRoutes;
  //   newRoute[name] = value;
  //   console.log(newRoute);
  //   this.setState({ ...this.state, createRoutes: newRoute });
  // };

  handleChangeCREATE = e => {
    let newRoute = this.state.createRoutes;
    const { name, value } = e.target;
    if(name === "photo" ) {
      newRoute[name] = e.target.files[0]
      this.setState({...this.state, newRoute})
      console.log(this.state.createRoutes);
    } else {
      newRoute[name] = value;
      this.setState({ ...this.state, newRoute });
    }
  };
  

  getRoute = route => {

  const formData = new FormData();
  Object.keys(route).forEach(key => formData.append(key, route[key]));

  return this.service.post('/createTrack', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
})
.then(response => {
//  this.props.getUser(response.data)
return response;
})
}
  // Función que recibe los datos de yelp.js
  getRestaurants = restaurant => {
    this.setState({ ...this.state, restaurant: restaurant });
  };

  render() {
    const restaurants = this.state.restaurant ? (
      this.state.restaurant.map(restaurant => {
        return (
          <div id="restaurantContainer">
            <h3>{restaurant.e.name}</h3>
            <img src={restaurant.e.image_url} alt="restaurante" />
            <p>{restaurant.e.location.address1}</p>
            <p>{restaurant.e.price}</p>
            <button>Añadir parada</button>
          </div>
        );
      })
    ) : (
      <h2>No hay restaurantes</h2>
    );

    return (
      <div>
        <hr/>
        <h1>Crear rutas</h1>

        <form onSubmit={e => this.handleFormSubmit(e)}>
          <input
            type="text"
            name="routesName"
            onChange={e => this.handleChangeCREATE(e)}
            placeholder="Nombre de la ruta"
            autoComplete="off"
          />
          <input
            type="text"
            name="category"
            onChange={e => this.handleChangeCREATE(e)}
            placeholder="Categoría"
            autoComplete="off"
          />
          <input
            type="text"
            name="routesType"
            onChange={e => this.handleChangeCREATE(e)}
            placeholder="Tipo de ruta"
            autoComplete="off"
          />

          <input
            type="file"
            name="photo"
            onChange={e => this.handleChangeCREATE(e)}
          />

          <br />
          <input value="Crear ruta" type="submit" />
        </form>

        <InputYelp
          getRestaurants={this.getRestaurants}
          restaurants={this.props.restaurants}
          handleFormSubmit={this.handleFormSubmit}
          handleChange={this.handleChange}
        />
        <div id="restaurantsContainer">{restaurants}</div>
      </div>
    );
  }
}
