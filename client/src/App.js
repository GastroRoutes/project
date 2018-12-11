import React, { Component } from "react";
import "./App.css";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Message from "./components/Message";
import AuthService from "./components/auth/AuthService";
import { Route, Link } from "react-router-dom";
import InputYelp from './components/routes/yelp'
const axios = require('axios')

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
      restaurant: null
    };

    this.authService = new AuthService();
    this.inputYelp = new InputYelp()
    this.fetchUser();
  }
  // mantener al usuario loggeado incluso al refrescar ¿?
  fetchUser = () => {
    this.authService
      .loggedin()
      .then(user => this.setState({ ...this.state, user }));
  };

  getUser = user => {
    this.setState({ ...this.state, user });
  };

  logout = () => {
    this.authService
      .logout()
      .then(() => this.setState({ ...this.state, user: null }));
  };
  // función que devuelve el valor del back al front
  restaurants = (rest)=>{
    console.log(rest)
    console.log("Estoy en app y soy la función restaurants!!!!!!!")

  }

  render() {
    const welcome = this.state.user ? (
      <div>
        <p>Hola {this.state.user.username}</p>
        <button onClick={this.logout}>Logout</button>
      </div>
    ) : (
      <div>
        <p>No user</p>
        <Link to="/">Home</Link> - <Link to="/signup">Signup</Link> -{" "}
        <Link to="/login">Login</Link>
      </div>
    );

    return (
      
      <div className="App">
        <InputYelp restaurants={this.restaurants} handleFormSubmit={this.handleFormSubmit} handleChange={this.handleChange}></InputYelp>
        {welcome}
        
        <Message user={this.state.user} />
        <Route
          path="/signup"
          render={() => <Signup getUser={this.getUser} />}
        />
        <Route path="/login" render={() => <Login getUser={this.getUser} />} />
      </div>
    );
  }
}

export default App;
