import React, { Component } from "react";
import axios from "axios";

export default class RoutesFrmOotherUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      followMessage: false
    };
    // this.getAllRoutesFromAUser()
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
      withCredentials: true
    });
  }
  componentDidMount() {
    this.getAllRoutesFromAUser();
  }
  getAllRoutesFromAUser = () => {
    const { params } = this.props.match;
    this.service.get(`/users/${params.id}/users`).then(response => {
      console.log(response.data);
      this.setState({ ...this.state, user: response.data });
    });
  };
  followTrack = (e, id) => {
    e.preventDefault();
    return this.service
      .post(`/tracks/${id}/followRoutes`, id) 
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
    const user = this.state.user;
    const showUser = user ? (
      <div>
        <div className="yourRoutes-big-container">
        <img className="user-photo" src={user.imgPath} />
        <h1>Rutas de {user.username}</h1>
          <div className="show-route-container">
        {user.createdTrack.map(element => {
        return (
          <div className="yourRoutes-container">
            <div
              className="each-Route"
              style={{ backgroundImage: `url(${element.image})` }}
            >
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
      })}
      </div>
      </div>
      </div>
    ) : (
      <div />
    );
    return (
    <div>
    {followMessage}
    {showUser}
    </div>
    )
  }
}
