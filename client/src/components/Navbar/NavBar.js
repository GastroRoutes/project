import React, { Component } from 'react'
import { Route, Link } from "react-router-dom";
import "./NavBar.css"


export default class NavBar extends Component {
  render() {
    return (
      <div>
        <nav>
            <div>
            </div>
            <div className="navbar">
            <div>
              <img className="logo" src="./images/logo.png"/>
            </div>
            <div className="navbar-images">
            <Link to="/profile"><img src="./images/manifest.png" alt="profile"/></Link>
            <Link to="/allRoutes"><img src="./images/ruta.svg" alt="profile"/></Link>
            <Link to="/ranking"><img className="trophy-img"src="./images/trophy-2707775.png" alt="ranking"/></Link>
            <img src="./images/logout.png" alt="logout"onClick={this.props.logout}/>
            </div>
            </div>
        </nav>
      </div>
    )
  }
}
