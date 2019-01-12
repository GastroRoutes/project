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
      restaurant: null,
      restaurants: [],
      preload: false
    };

    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
      withCredentials: true
    });
  }
  handleFormSubmit = e => {
    e.preventDefault();
    const {
      routesName,
      category,
      photo,
      date,
      hour,
      duration
    } = this.state.createRoutes;
    this.setState({...this.state, preload: true})
    this.getRoute({ routesName, category, photo, date, hour, duration }).then(
      route => {
        //   let id = route.data._id;
        this.props.createRoutes(route.data);
        this.setState({ ...this.props.state, createRoutes: null,preload:false });
        // this.setState({ ...this.state, id }); /// hay que tratarlo. Llega como array
      }
    );
  };

  handleChangeCREATE = e => {
    let newRoute = this.state.createRoutes;
    const { name, value } = e.target;
    if (name === "photo") {
      newRoute[name] = e.target.files[0];
      this.setState({ ...this.state, newRoute });
      console.log(this.state.createRoutes);
    } else {
      newRoute[name] = value;
      this.setState({ ...this.state, newRoute });
    }
  };

  getRoute = route => {
    const formData = new FormData();
    Object.keys(route).forEach(key => formData.append(key, route[key]));
    formData.append(
      "selectedRestaurants",
      JSON.stringify(this.state.restaurants)
    );

    return this.service
      .post("/tracks/createTrack", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {

        //  this.props.getUser(response.data)
        return response;
      });
  };
  // Función que recibe los datos de yelp.js
  sendRestaurants = restaurant => {
    this.setState({ ...this.state, restaurant: restaurant });
  };

  addRestaurant = restaurant => {
    const restaurants = [...this.state.restaurants];

    restaurants.push(restaurant.e);

    this.setState({ ...this.state, restaurants });
  };

  // Función que envía los datos al back, a la ruta /yelp
  getRestaurants = (term, location) => {
    this.setState({ ...this.state, preload: true });
    return this.service.post("/yelp/yelp", { term, location })
    .then(response => {
      this.setState({ ...this.props.state, preload: false });
      return response.data.map(e => {
        return { e };
      });
    });
  };

  render() {
    const restaurants = this.state.restaurant ? (
      <div className="show-route-container">
        {this.state.restaurant.map(restaurant => {
          return (
            <div className="yourRoutes-container">
              <div
                className="each-Route"
                style={{ backgroundImage: `url(${restaurant.e.image_url})` }}
              />
              <div className="form-container">
                <h3>{restaurant.e.name}</h3>
                <p>{restaurant.e.location.address1}</p>
                <p>{restaurant.e.price}</p>
                <button onClick={() => this.addRestaurant(restaurant)}>
                  Añadir parada
                </button>
              </div>
            </div>
          );
        })}
      </div>
    ) : (
      <div>{/* <h3>Aún no has añadido paradas</h3> */}</div>
    );

    let selectedRestaurants = "Aún no has seleccionado ningún restaurante.";

    if (this.state.restaurants.length) {
      selectedRestaurants = this.state.restaurants.map(restaurant => {
        return <p>- {restaurant.name}</p>;
      });
    }
    const preload = this.state.preload ? (
      <div className="preload-container">
      <div className="preload">
        <img src="/images/gif-preload.gif" />

      </div>
      </div>
    ) : (
      <div />
    );
    return (
      <div>
        {preload}
        <div className="yourRoutes-big-container">
          <h1>Crear rutas</h1>

          <div className="center-form sticky">
            <label>Restaurantes añadidos:</label>
            <label>{selectedRestaurants}</label>
          </div>
          <InputYelp
            state={this.state}
            scrollToRecipe={this.props.scrollToRecipe}
            sendRestaurants={this.sendRestaurants}
            getRestaurants={this.getRestaurants}
            restaurants={this.props.restaurants}
            handleFormSubmit={this.handleFormSubmit}
            handleChange={this.handleChange}
          />
          <form
            className="center-form"
            onSubmit={e => this.handleFormSubmit(e)}
          >
            <div clasName="form-inputs">
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
              {/* <label htmlFor="">Fecha: </label> */}
              <input
                type="date"
                name="date"
                onChange={e => this.handleChangeCREATE(e)}
                placeholder="Fecha"
                autoComplete="off"
              />
              {/* <label htmlFor="">Hora: </label> */}
              <input
                type="time"
                name="hour"
                onChange={e => this.handleChangeCREATE(e)}
                placeholder="Hora de inicio"
                autoComplete="off"
              />
              <input
                type="text"
                name="duration"
                onChange={e => this.handleChangeCREATE(e)}
                placeholder="Duración"
                autoComplete="off"
              />
              <input
                className="file-input"
                type="file"
                name="photo"
                onChange={e => this.handleChangeCREATE(e)}
              />
            </div>
            <div className="form-inputs">
              <input value="Crear ruta" type="submit" />
            </div>
          </form>
          <div />

          {restaurants}
        </div>
      </div>
    );
  }
}
