import React, { Component } from "react";
import "./App.css";
import Message from "./components/Message";
import AuthService from "./components/Home/auth/AuthService";
import { Route, Link, Redirect } from "react-router-dom";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/ProfileContainer/ProfileContainer";
import InputYelp from "./components/Profile/YourRoutes/yelp";
import NavBar from "./components/Navbar/NavBar";

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
      route: null
    };
    
    this.authService = new AuthService();
    this.inputYelp = new InputYelp();
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


  createRoutes = route => {
    console.log("función: createRoutes. Recibe: (siguiente console.log")
    console.log(route)
    this.setState({...this.state, route: route})
  }



  render() {

    const welcome = this.state.user ? (
      <div>
        <NavBar logout={this.logout}></NavBar>
        
        <Route
          path="/profile"
          render={() => <Profile user ={this.state.user} createRoutes={this.createRoutes} />}
        />
        
      </div>
    ) : (
      <Route
        path="/"
        render={() => (
          <Home getUser={this.getUser} fetchUser={this.fetchUser} />
        )}
      />
    );


    return (
      <div className="App">
      
        {welcome}
        <Message user={this.state.user} />
      </div>
    );
  }
}

export default App;
