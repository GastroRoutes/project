import React, { Component } from 'react'
import InputYelp from "../YourRoutes/yelp";
import axios from "axios";
export default class CreateRoutes extends Component {
    constructor(){
        super()
        this.state = {
            createRoutes: {
              routesName: "",
              category: "",
              routesType: ""
            }
    }
    
    this.service = axios.create({
        baseURL: `${process.env.REACT_APP_API_URL}/tracks`,
        withCredentials: true
      });
    }
    handleFormSubmit = e => {
        e.preventDefault();
        const { routesName, category, routesType } = this.state.createRoutes;
        this.getRoute({ routesName, category, routesType })
        .then(route => {
            console.log(route)
        //   let id = route.data._id;

          this.props.createRoutes(route.data);
          this.setState({...this.props.state, createRoutes: null})
          // this.setState({ ...this.state, id }); /// hay que tratarlo. Llega como array
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
            console.log(response)
            return response;
          }
          );
        };
    
  render() {
    return (
      <div>
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
          <br/>
             <input value="Crear ruta" type="submit" />
        </form>

        <InputYelp
          getRestaurants={this.getRestaurants}
          restaurants={this.props.restaurants}
          handleFormSubmit={this.handleFormSubmit}
          handleChange={this.handleChange}
          />

      </div>
    )
  }
}
