import React, { Component } from "react";
import axios from "axios";
import "./AllRoutes.css";
import { Link } from "react-router-dom";
import EachRoute from "./EachRoute/EachRoute"

export default class AllRoutes extends Component {
  constructor() {
    super();
    this.state = {
      allRoutes: null,
      followMessage: false
    };
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/tracks`,
      withCredentials: true
    });
    this.getAllRoutes();
  }

  getAllRoutes = () => {
    this.service.get("/allRoutes").then(response => {
      this.setState({ ...this.state, allRoutes: response.data.track });
    });
  };

  // Todo: Esta función se puede pasar a la sección de rutas del resto de usuarios.
  followTrack = (e, id) => {
    e.preventDefault();
    return this.service
    .post(`/${id}/followRoutes`, id)
    .then(response => {
        this.setState({ ...this.state, followMessage: true });
      })
      .catch(e=> console.log(e))
      .then(() => {
        setTimeout(() => {
          this.setState({ ...this.state, followMessage: false });
        }, 1500);
      });
  };

  assessRoute = (e, _id) => {
    const qualification = e.target.value;
    return this.service
      .post(`/qualification`, { qualification, _id })
      .then(response => {
        console.log(response.data.message);
      })
      .catch(e => console.log(e.data));
  };
  render() {
    const followMessage = this.state.followMessage ? (
      <div className="followMessage">
      
        <div className="MessageContainer">
          <h3>La ruta se ha guardado correctamente</h3>
        </div>
      </div>
    ) : (
      <div />
    );
    const printAllRoutes = this.state.allRoutes ? (
      this.state.allRoutes.map(element => {
        return (
          <div className="yourRoutes-container">
              <EachRoute element={element} followTrack={this.followTrack} assessRoute={this.assessRoute}/>
          </div>
        );
      })
    ) : (
      <div />
    );
    return (
      <div>
        {followMessage}
        <h1 className="align-center">Todas las rutas</h1>
        <div className="yourRoutes-big-container">
          <div className="show-route-container">{printAllRoutes}</div>
        </div>
      </div>
    );
  }
}
