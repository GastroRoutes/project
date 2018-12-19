import React, { Component } from "react";
import "./Home.css";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import { Route, Link } from "react-router-dom";
// import Signup from "./auth/Signup";
// import Login from "./auth/Login";
// import Message from "./Message";
import AuthService from "./auth/AuthService";
// import { Route, Link } from "react-router-dom";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.props.fetchUser();
    this.AuthService = new AuthService();
  }
  render() {
    return (
      <div class="mainImage">
        <img src="/images/gif preload.gif" alt="" />
        <div />
        <h1>No user</h1>
        <Route
          path="/signup"
          render={() => (
            <Signup
              getUser={this.props.getUser}
              fetchUser={this.props.fetchUser}
            />
          )}
        />
        <Route
          path="/login"
          render={() => <Login getUser={this.props.getUser} />}
        />
        <Link to="/">Home</Link> -<Link to="/signup">Signup</Link> -{" "}
        <Link to="/login">Login</Link>
      </div>
    );
  }
}
