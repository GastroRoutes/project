import React, { Component } from 'react';
import AuthService from './AuthService';
import {Redirect} from "react-router-dom";
import "./Signup.css";
import { Link } from "react-router-dom";
export default class Signup extends Component {
  constructor() {
    super();

    this.state = {
      username : '',
      email: '',
      password: '',
      // photo: '',
      redirect: false
    }

    this.authService = new AuthService();
  }

  handleFormSubmit = (e) => {
    e.preventDefault();

    const {username , email, password} = this.state;

    this.authService.signup({username, email, password })
    .then(user => {

      this.setState({username : '', email: '', password: '',redirect: true},()=>
      this.props.getUser(user) )
    });
  }

  handleChange = (e) => {
    const {name, value} = e.target;

    // if(name === "photo") {
    //   this.setState({...this.state, photo: e.target.files[0]})
    // } else {
      this.setState({...this.state, [name]: value});
    // }
  }

  render() {
    if(this.state && this.state.redirect) {
      return <Redirect to="/profile" />
    }

    return (
      <div class="register-container">
        <h2>Signup</h2>
        <form onSubmit={this.handleFormSubmit} class="form">
          <label>Nombre de usuario</label>
          <input type="text" name="username" onChange={e => this.handleChange(e)} />

          <label>Email</label>
          <input type="email" name="email" onChange={e => this.handleChange(e)} />

          <label>Contraseña</label>
          <input type="password" name="password" onChange={e => this.handleChange(e)} />


          {/* <label>Photo</label>
          <input type="file" name="photo" onChange={e => this.handleChange(e)} /> */}

          <input type="submit" value="Signup"/>
        </form>
        <div class="center-text">
        <p>¿Tienes una cuenta?</p><Link id="orange-text" to="/login">Login</Link>
        </div>
      </div>
    )
  }
}
