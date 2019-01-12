import React, { Component } from "react";
import axios from "axios";
import "./AllRoutes.css";
import { Link } from "react-router-dom";
import EachRoute from "./EachRoute/EachRoute";

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
      .catch(e => console.log(e));
  };

  sendRating = (rating, _id) => {
    console.log(rating, _id)
    return this.service
      .post(`/qualification`, { rating, _id })
      .then(response => {
        console.log(response.data.message);
      })
      .catch(e => console.log(e.data));
  };
  render() {

    const printAllRoutes = this.state.allRoutes ? (
      this.state.allRoutes.map(element => {
        return (
          <div className="yourRoutes-container">
            <EachRoute
              element={element}
              followTrack={this.followTrack}
              sendRating={this.sendRating}
            />
          </div>
        );
      })
    ) : (
      <div />
    );
    return (
      <div>
        <div className="yourRoutes-big-container">
        <h1 className="align-center">Todas las rutas</h1>
          <div className="show-route-container">{printAllRoutes}</div>
        </div>
      </div>
    );
  }
}
