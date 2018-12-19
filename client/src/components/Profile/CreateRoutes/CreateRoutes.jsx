import React, { Component } from "react";
import InputYelp from "../YourRoutes/yelp";
import axios from "axios";
export default class CreateRoutes extends Component {
  constructor() {
    super()
    this.state = {
      createRoutes: {
        routesName: "",
        category: "",
        routesType: "", 
      },
      restaurant: null, 
      restaurants: []
    };

    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/tracks`,
      withCredentials: true
    });
  }
  handleFormSubmit = e => {
    e.preventDefault();
    const { routesName, category, photo, date, hour, duration } = this.state.createRoutes;
    this.getRoute({ routesName, category, photo, date, hour, duration })
    .then(route => {
      console.log(route.data);
      //   let id = route.data._id;
      this.props.createRoutes(route.data);
      this.setState({ ...this.props.state, createRoutes: null });
      // this.setState({ ...this.state, id }); /// hay que tratarlo. Llega como array
    });
  };

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
  formData.append('selectedRestaurants', JSON.stringify(this.state.restaurants))

  console.log('vamos a enviar también los restaurantes', this.state.restaurants)

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

  addRestaurant = restaurant => {
    console.log('hola pistachitos', restaurant);
    const restaurants = [...this.state.restaurants];

    restaurants.push(restaurant.e);

    this.setState({...this.state, restaurants})
  }

  render() {
    const restaurants = this.state.restaurant ? (
      this.state.restaurant.map(restaurant => {
        return (
          <div id="restaurantContainer">
            <h3>{restaurant.e.name}</h3>
            <img src={restaurant.e.image_url} alt="restaurante" />
            <p>{restaurant.e.location.address1}</p>
            <p>{restaurant.e.price}</p>
            <button onClick={() => this.addRestaurant(restaurant)}>Añadir parada</button>
          </div>
        );
      })
    ) : (
      <div></div>
    );

    let selectedRestaurants = 'No hay pistachitos seleccionados'

    console.log(this.state)

    if (this.state.restaurants.length) {
      selectedRestaurants = this.state.restaurants.map(restaurant => {
        return <p>{restaurant.name}</p>
      })
    }

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
          <label htmlFor="">Fecha: </label>
          <input
            type="date"
            name="date"
            onChange={e => this.handleChangeCREATE(e)}
            placeholder="Fecha"
            autoComplete="off"
          />
          <label htmlFor="">Hora: </label>
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
            type="file"
            name="photo"
            onChange={e => this.handleChangeCREATE(e)}
          />

          <p>Restaurantes</p>

          {selectedRestaurants}

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
