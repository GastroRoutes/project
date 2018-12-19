import React, { Component } from 'react'
import { Route, Link } from "react-router-dom";
export default class NavBar extends Component {
  render() {
    return (
      <div>
        <nav>
            <div>

            </div>
            <div>
            <Link to="/profile"><img src="perfil.png" alt="profile"/></Link> - 
            <Link to="/allRoutes">AllRoutes</Link> -{" "}
            <img src="./logout.png" alt="logout"onClick={this.props.logout}/>
          
            </div>
        </nav>
      </div>
    )
  }
}
