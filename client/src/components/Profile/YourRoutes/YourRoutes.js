import React, { Component } from "react";
import axios from "axios";
import "./YourRoutes.css";
import InputYelp from "../YourRoutes/yelp";
// import MyFancyComponent from "../../Map/Map";
import MapTest from "../../Map/MapTest";

import { div } from "gl-matrix/src/gl-matrix/vec2";


export default class YourRoutes extends Component {
  constructor(props) {
    super(props);
    this.service = axios.create({
      baseURL: "http://localhost:5000/tracks",
      withCredentials: true
    });

    this.state = {
      createRoutes: {
        routesName: "",
        category: "",
        routesType: ""
      },
      userRoutes: [{}],
      restaurant: null
    };
    this.routes = [];
    this.getUserRoutes();
  }
  
  // PETICIÓN DE TODAS LAS RUTAS DEL USUARIO
  getUserRoutes = () => {
    return this.service.get("/").then(response => {
      // console.log(response.data.track.createdTrack);
      let userRoutesArr = response.data.track.createdTrack;
      this.setState({ ...this.state, userRoutes: userRoutesArr });
      return response;
    });
  };
  
  // CREAR RUTAS
  handleFormSubmit = e => {
    e.preventDefault();
    const { routesName, category, routesType } = this.state.createRoutes;
    this.getRoute({ routesName, category, routesType }).then(route => {
      let id = route.data._id;
      // console.log(route.data._id)
      this.props.createRoutes(route.data);
      // this.setState({ ...this.state, id }); /// hay que tratarlo. Llega como array
      this.getUserRoutes();
    });
  };
  
  handleChangeCREATE = e => {
    const { name, value } = e.target;
    let newRoute = this.state.createRoutes;
    newRoute[name] = value;
    console.log(newRoute);
    this.setState({ ...this.state, createRoutes: newRoute });
  };
  
  getRoute = route => {
    return this.service.post("/createTrack", route).then(response =>
      // response)
      {
        // console.log(response)
        return response;
      }
      );
    };

    
    
    // ACTUALIZAR RUTAS
    handleFormSubmitUPDATE = (e, id) => {
      e.preventDefault();
      const { routesName, category, routesType } = this.state.createRoutes;
      this.updateRoute({ routesName, category, routesType }, id).then(route => {
        console.log(route.data.routesName);
        this.getUserRoutes();
        // this.props.getRoute(route.data.routesName) /// hay que tratarlo. Llega como array
      });
    };
    
    handleChangeUPDATE = e => {
      const { name, value } = e.target;
      let newRoute = this.state.createRoutes;
      newRoute[name] = value;
      console.log(newRoute);
      this.setState({ ...this.state, createRoutes: newRoute });
    };
        
    updateRoute = (route, id) => {
      return this.service.post(`/${id}/update`, route).then(response => {
        return response;
      });
    };
    
    // BORRAR RUTAS
    deleteRoute = (e, id) => {
      e.preventDefault();
      return this.service.post(`/${id}/delete`, id).then(response => {
        this.getUserRoutes();
        return response;
      });
    };
    

    // Función que recibe los datos de yelp.js
    getRestaurants = restaurant => {
      console.log("·soy la función restaurantes y tengo esto: ")
      console.log(restaurant);
      this.setState({ ...this.state, restaurant: restaurant });
    };

    // componentDidMount() {
    //   this.getRestaurants();
    //   console.log(this.getRestaurants())
    // }
    render() {

      const restaurants = this.state.restaurant? (this.state.restaurant.map((restaurant)=>{
        return (
          

          <div id="restaurantContainer">
          {console.log(restaurant.e)}
          <h3>{restaurant.e.name}</h3> 
          <img src={restaurant.e.image_url}/>
          <p>{restaurant.e.location.address1}</p> 
          <p>{restaurant.e.price}</p>
          <button>Añadir parada</button>
          </div>
  
        )
      }
      )
       ) : (<h2>No hay restaurantes</h2>)
      
      return (
        <div>
        <h1>Tus rutas</h1>
        <h3>{this.state.routesName}</h3>
        <h1>Crear rutas</h1>
        

        <InputYelp
          getRestaurants={this.getRestaurants}
          restaurants={this.props.restaurants}
          handleFormSubmit={this.handleFormSubmit}
          handleChange={this.handleChange}
          />

          <div id="restaurantsContainer">
          {restaurants}
          </div>

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
          <br/>
             <input value="Crear ruta" type="submit" />
        </form>

        <br />
        <br />
        <br />

        {this.state.userRoutes.map(track => {
          return (
            <div style={{ border: "1px solid blue" }} key={track._id}>
              <h3>Name: {track.routesName}</h3>
              <p>Category: {track.category} </p>
              <form onSubmit={e => this.handleFormSubmitUPDATE(e, track._id)}>
                <label>Actualizar rutas: </label>

                <input
                  type="text"
                  name="routesName"
                  onChange={e => this.handleChangeUPDATE(e)}
                  placeholder="Nombre de la ruta"
                  autoComplete="off"
                />
                <input
                  type="text"
                  name="category"
                  onChange={e => this.handleChangeUPDATE(e)}
                  placeholder="Categoría"
                  autoComplete="off"
                />
                <input
                  type="text"
                  name="routesType"
                  onChange={e => this.handleChangeUPDATE(e)}
                  placeholder="Tipo de ruta"
                  autoComplete="off"
                />

                {/* <input
            type="file"
            name="Photo"
            onChange={e => this.handleChangeUPDATE(e)}
          /> */}

                <input type="submit" />
                {/* <input type="text" name="location" onChange={e => this.handleChange(e)} /> */}
                <br />
                <br />
                <br />
              </form>
              {/* <img src={`${track.image_url}`} style={{ width: "10%" }} /> */}
              <br />
              <form onSubmit={(e) => this.deleteRoute(e, track._id)}>
              <input
                value="DELETE"
                type="submit"
              />
              </form>
              <br />
              <br />
            </div>
          );
        })}
       {/* <MyFancyComponent /> */}
       <MapTest />
      </div>
    );
  }
}
