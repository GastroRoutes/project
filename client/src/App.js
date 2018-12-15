import React, { Component } from "react";
import "./App.css";
import Message from "./components/Message";
import AuthService from "./components/Home/auth/AuthService";
import { Route, Link, Redirect } from "react-router-dom";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/ProfileContainer/ProfileContainer";
import InputYelp from "./components/Profile/YourRoutes/yelp";
class App extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
      restaurant: "",
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


//  La función getRestaurants() de abajo
//  va mejor en yourRoutes, ya que es el 
//  único  sitio done se va a llamar (tiene 
//  más sentido que pasarsela al app, luego que el 
//  app se la pase al profileContainer y luego a YourRoutes
//   !Y eso que yourRoutes es padre de yelp, donde se 
//  llama a getRestaurants(), función que es del abuelo
//   de yourRestaurants y, por tanto, visabuelo de yelp. 
//  ((((( básicamente por eso peta  ))))

  getRestaurants = restaurant => {
    console.log("·soy la función restaurantes y tengo esto: ")
    console.log(restaurant);
    this.setState({ ...this.state, restaurant: restaurant });
  };

  createRoutes = route => {
    console.log("función: createRoutes. Recibe: (siguiente console.log")
    console.log(route)
    this.setState({...this.state, route: route})
  }

  render() {

    const welcome = this.state.user ? (
      <div>
        <Route
          path="/profile"
          render={() => <Profile user ={this.state.user} createRoutes={this.createRoutes} restaurants={this.state.restaurant} getRestaurants={this.getRestaurants} />}
        />
        <button onClick={this.logout}>Logout</button>
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
