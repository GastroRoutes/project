import React, { Component } from "react";
import axios from "axios";
import "./AllRoutes.css";

export default class AllRoutes extends Component {
  constructor() {
    super();
    this.state = {
      allRoutes: null,
      showGreenTickOk: null
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
    // debugger
    e.preventDefault();
    return this.service
      .post(`/${id}/followRoutes`, id) //le paso la id del track
      .then(response => {
        console.log(response);
        // this.props.getUser()
        if (response.data.followed) {
          this.setState({ ...this.state, showGreenTickOk: true });
          console.log(this.state.showGreenTickOk);
        } else {
          this.setState({ ...this.state, showGreenTickOk: true });
        }
      });
  };

  render() {
    const printAllRoutes = this.state.allRoutes ? (
      this.state.allRoutes.map(element => {
        return (
          <div className="show-route-container">
          <div className="yourRoutes-container">
          <div className="each-Route">
              <img src={element.image} alt="" />
              </div>
            <h4>{element.routesName}</h4>
            <h5>{element.category}</h5>
            <h5>{element.date}</h5>
            <h5>{element.hour}</h5>
            <h5>{element.duration}</h5>


             
            <div>
              </div>
              {!this.state.showGreenTickOk ? (
                <button className="orange-text" onClick={e => this.followTrack(e, element._id)}>
                  follow
                </button>
              ) : (
                <button className="follow-button"
                  style={{ backgroundColor: "green" }}
                  onClick={e => this.followTrack(e, element._id)}
                >
                  follow
                </button>
              )}
            </div>
          </div>

        );
      })
    ) : (
      <h1>Cargando...</h1>
    );
    return <div>{printAllRoutes}</div>;
  }
}
