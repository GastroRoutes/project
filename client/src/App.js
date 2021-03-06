import React, { Component } from "react";
import "./reset.css"
import "./App.css";
// import Message from "./components/Message";
import AuthService from "./components/Home/auth/AuthService";
import { Route, Link, Redirect, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/ProfileContainer/ProfileContainer";
import InputYelp from "./components/Profile/YourRoutes/yelp";
import NavBar from "./components/Navbar/NavBar";
import AllRoutes from "./components/AllRoutes/AllRoutes"
import RoutesFrmOotherUsers from "./components/AllRoutes/RoutesFromOtherUsers/RoutesFromOtherUsers"
import Ranking from "./components/ranking/Ranking"


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
  
  //todo: setUser instead of getuser
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
      <Switch>

        <Route
          path="/profile"
          render={() => <Profile getUser={this.getUser} user ={this.state.user} createRoutes={this.createRoutes} />}
          />
        <Route path="/allRoutes" render={()=> <AllRoutes getUser={this.getUser}/>}></Route>
        <Route path="/ranking" render={()=> <Ranking getUser={this.getUser}/>}></Route>
        <Route path="/usersRoutes/:id" 
        component={RoutesFrmOotherUsers}/>
        <Route
          path="/"
          render={() => <Profile getUser={this.getUser} user ={this.state.user} createRoutes={this.createRoutes} />}
          />
          </Switch>
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

      </div>
    );
  }
}

export default App;
