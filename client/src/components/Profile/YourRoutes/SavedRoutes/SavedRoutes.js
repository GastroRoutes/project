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
        console.log(this.state.user)
        return response;
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div>
        Tus rutas guardadas
        {this.state.user.savedRoutes.map((route)=>{
            return <h1>{route.routesName}</h1>
            
        })
    }
      </div>
    );
  }
}
