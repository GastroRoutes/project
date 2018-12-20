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
<div>
      <header>
      <div class="background-image">
      <img src="/images/barimg.png" alt=""/>
      </div>
      <div class="register">
        <div>
          <Signup
            getUser={this.props.getUser}
            fetchUser={this.props.fetchUser}
          />
        </div>
        <div>
          <Route
            path="/login"
            render={() => <Login getUser={this.props.getUser} />}
          />
          <Link to="/">Home</Link> -<Link to="/signup">Signup</Link> -{" "}
          <Link to="/login">Login</Link>
        </div>
        </div>
      </header>
      <section className="mainText">
      <h3>Rutas gastronómicas por el mundo</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, iure optio velit hic necessitatibus recusandae! Velit dignissimos, veniam nobis eos accusamus recusandae ea asperiores sed, laborum repellat libero, ad quam!
        </p>
      </section>
      <hr/>
      <section class="carrusel-img">
        <img src="/images/carrusel.png" alt=""/>
      </section>
      <hr/>
      <section className="mainText">
      <h3>Rutas gastronómicas por el mundo</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, iure optio velit hic necessitatibus recusandae! Velit dignissimos, veniam nobis eos accusamus recusandae ea asperiores sed, laborum repellat libero, ad quam!
        </p>
      </section>

<footer>
  Copyright 2018 Jorge Devesa & Ángel Terrón
</footer>
     </div>

    );
  }
}
