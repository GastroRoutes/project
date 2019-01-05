import React, { Component } from "react";
import axios from "axios";
import "./AllRoutes.css";
import { Link } from "react-router-dom";

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

  followTrack = (e, id) => {
    e.preventDefault();
    return this.service
      .post(`/${id}/followRoutes`, id) //le paso la id del track
      .then(response => {
        this.setState({ ...this.state, followMessage: true });
      })
      .then(() => {
        setTimeout(() => {
          this.setState({ ...this.state, followMessage: false });
        }, 1500);
      });
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
          <div className="show-route-container">
          <div className="yourRoutes-container">
            <div
              className="each-Route"
              style={{ backgroundImage: `url(${element.image})` }}
            >
              <Link to={`/usersRoutes/${element.creatorID[0]._id}`}>
                <div className="show-user-on-routes">
                  <img src={element.creatorID[0].imgPath} />
                  <label className="margin-user-creator">
                    {element.creatorID[0].username}
                  </label>
                </div>
              </Link>
            </div>
            <div className="form-container margin-bottom-container-routes">
              <h3>{element.routesName}</h3>
              {/* <h3>{element.routesType}</h3> */}
              {/* <h4>{element.category}</h4> */}
              {element.restaurants.map(restaurant => {
                return (
                  <div className="each-stop-on-target">
                    <hr />

                    <div className="flex-space-between">
                      <a href={restaurant.url}>
                        <h4>
                          <img src="./images/ImportedLayers.png" alt="" />
                          {restaurant.restaurantName}
                        </h4>
                      </a>
                    </div>
                    <div className="restaurant-detail-container">
                      <h5> Puntuación: {restaurant.rating}</h5>
                      <h5>{restaurant.location.city}</h5>
                    </div>
                  </div>
                );
              })}
              {/* <p>{element.creatorID[0].username}</p> */}
              <button
                className="follow-button"
                onClick={e => this.followTrack(e, element._id)}
              >
                Guardar
              </button>
            </div>
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
