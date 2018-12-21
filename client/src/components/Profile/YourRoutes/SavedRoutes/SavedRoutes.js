import React, { Component } from "react";
import axios from "axios";
export default class SavedRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      showSavedRoutes: null
    };
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/tracks`,
      withCredentials: true
    });
    this.getUserRoutes();
  }
  showSavedRoutesButton = () => {
    this.setState({ ...this.state, showSavedRoutes: true });
  };
  getUserRoutes = () => {
    return this.service
      .get("/")
      .then(response => {
        let userRoutesArr = response.data.track;
        this.setState({ ...this.state, user: userRoutesArr });
        console.log(this.state.user);
        return response;
      })
      .catch(err => console.log(err));
  };
  
  render() {
    return (
      <div>
                <div className="yourRoutes-big-container">
        <h1 className="align-center">Tus rutas guardadas</h1>
          <div className="show-route-container">
        {this.state.user.savedRoutes.map(element => {
          return (
            
            <div className="yourRoutes-container">
              <div
                className="each-Route"
                style={{ backgroundImage: `url(${element.image})` }}
              />
              {console.log(element)}
              {/* <h1>{element.creatorID[0].username}</h1> */}
              <h2>{element.routesName}</h2>
              <h3>{element.routesType}</h3>
              <h4>{element.category}</h4>
            </div>
          );
        })}
      </div>
      </div>
      </div>
    );
  }
}
