import React, { Component } from 'react';
import axios from "axios";
import InputYelp from "../YourRoutes/yelp";
import Map from "../../Map/Map"
export default class YourRoutes extends Component {
  constructor(props) {
    super(props);
    this.service = axios.create({
      baseURL: "http://localhost:5000/tracks",
      withCredentials: true
    });

    this.state = {
        routesName: "",
        category: "",
        routesType: "",
        id: ""
    }
    this.routes = []
    this.peticion()
  }

  handleFormSubmit = e => {
    e.preventDefault();
    const { routesName, category, routesType } = this.state;
    this.getRoute({ routesName, category, routesType })
    .then(route =>{
      let id = route.data._id
      this.props.getRoute(route.data)
      this.setState({...this.state, id}) /// hay que tratarlo. Llega como array
    });
  }
  
  // handleFormSubmitUpdate = e => {
  //   e.preventDefault();
  //   const { routesName, category, routesType } = this.state;
  //   this.getRoute({ routesName, category, routesType })
  //   .then(route =>{
  //     console.log(route.data.routesName)
  //     this.props.getRoute(route.data.routesName) /// hay que tratarlo. Llega como array
  //   });
  // }

  handleChange = e => {
    console.log(e.target.name +": "+ e.target.value )
    const { name, value } = e.target;
    this.setState({ [name]: value});
  };

  getRoute = route => {
    console.log(route)
    return this.service.post("/createTrack", route)
    .then(response =>
      // response)
        {
        return response
           })
    };
  peticion = () => {

    return this.service.get("/")
    .then(response => {
         console.log(response.data.track.createdTrack)
         return response
           })
    };
  // getRoute = route => {

  //   return this.service.post("//updateRoute", route)
  //   .then(response =>
  //     // response)
  //       {
  //       return response
  //          })
  //   };


  render() {
    return (
      <div>
        <Map></Map>
        <h3>{this.state.routesName}</h3>
           <h1>Crear rutas</h1>
        <form onSubmit={e => this.handleFormSubmit(e)}>
          <input
            type="text"
            name="routesName"
            onChange={e => this.handleChange(e)}
            placeholder="Nombre de la ruta"
          />
          <input
            type="text"
            name="category"
            onChange={e => this.handleChange(e)}
            placeholder="Categoría"
          />
          <input
            type="text"
            name="routesType"
            onChange={e => this.handleChange(e)}
            placeholder="Tipo de ruta"
          />

          {/* <input
            type="file"
            name="Photo"
            onChange={e => this.handleChange(e)}
          /> */}

          <InputYelp
          getRestaurant={this.props.getRestaurant}
          handleFormSubmit={this.handleFormSubmit}
          handleChange={this.handleChange}
        />
        <input type="submit"/>
          {/* <input type="text" name="location" onChange={e => this.handleChange(e)} /> */}
          <br/>
          <br/>
          <br/>
          <h1>Actualizar rutas</h1>
        </form>
        <form onSubmit={e => this.handleFormSubmitUpdate(e)}>
          <input
            type="text"
            name="routesName"
            onChange={e => this.handleChange(e)}
            placeholder="Nombre de la ruta"
          />
          <input
            type="text"
            name="category"
            onChange={e => this.handleChange(e)}
            placeholder="Categoría"
          />
          <input
            type="text"
            name="routesType"
            onChange={e => this.handleChange(e)}
            placeholder="Tipo de ruta"
          />
          </form>
      </div>
    )
  }
}
