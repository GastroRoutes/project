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
    this.state = {
      showSignupOrLogin: null,
    }
  }
  toggleSignupLogin =()=>{
  this.setState({...this.state, showSignupOrLogin: true,})
  }

  render() {
    return (
<div>
      <header>
      <div class="register">
        <div>
        <Route
            path="/signup"
            render={() => <Signup getUser={this.props.getUser}
            fetchUser={this.props.fetchUser}
            />}
          />
        </div>
        <div class="register-buttons">
          <Route
            path="/login"
            render={() => <Login getUser={this.props.getUser} />}
          />
          {!this.state.showSignupOrLogin ? (
            <div>
          <button><Link onClick={this.toggleSignupLogin} to="/signup">Regístrate</Link></button>
           <button><Link onClick={this.toggleSignupLogin} to="/login">Login</Link></button>
            </div>

          ): (
            <div></div>
          )}

        </div>
        </div>
      <div class="background-image">
      <img src="/images/barimg.png" alt=""/>
      </div>
      
      </header>
      <section className="mainText">
      <h3>Rutas gastronómicas por el mundo</h3>
        <p>
        Imagine un viaje repleto de detalles gastronómicos, en el que usted disfrute de cada lugar y de su cultura gastronómica. Olvídese de reservas, solo tendrá que disfrutar de su viaje . Descubra en nuestra selección de rutas una forma diferente de viajar por España. Podrá crear su propia ruta comiendo en los restaurnates que desee disfrutando así de la mejor gastronomía local. En The Food Routes, no se tendrá que preocupar por ningun detalle, tan solo de disfrutar de las mejores propuestas para hacer de su viaje un viaje de ensueño.
        </p>
      <hr/>
      </section>
      <section class="carrusel-img">
        <img src="/images/carrusel.png" alt=""/>
      </section>
      <hr/>
      <section className="mainText">
      <h3>Rutas gastronómicas por el mundo</h3>
        <p>
      Cree su propia ruta o simplemente inscribase en las creadas por otros usuarios. Podrá conocer nuevos lugares, disfrutar de los mejores restaurantes según sus gustos y conocer a los próximos compañeros de aventura.
        </p>
      </section>

<footer>
  Copyright 2018 Jorge Devesa & Ángel Terrón
</footer>
     </div>

    );
  }
}
