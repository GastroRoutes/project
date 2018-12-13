import React, { Component } from 'react';
import AuthService from './AuthService';
import { Route, Redirect, Link } from "react-router-dom";
// import Home from '../Home';

export default class Login extends Component {
  constructor() {
    super();
    
    this.state = {
      username: '',
      password: '',
      redirect: false
    }

    this.authService = new AuthService();
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    
    const {username, password} = this.state;
    this.authService.login({username, password})
    .then(user => {

// debugger
      
      this.setState({...this.state, redirect : true}, () => {
        this.props.getUser(user)
      })
      
    }) 


  }

  handleChange = (e) => {
    const {name, value} = e.target;

    this.setState({[name]: value}); 
  }

  render() {
      if(this.state.redirect){
        console.log("entra")
        return <Redirect to="/profile"/>
      }
    
    return (
      
      <div>
        <h2>Login</h2>
        <form onSubmit={this.handleFormSubmit}>
          <label>Username</label>
          <input type="text" name="username" onChange={e => this.handleChange(e)} />

          <label>Password</label>
          <input type="password" name="password" onChange={e => this.handleChange(e)} />

         <input type="submit" value="Login"/>
        </form>
      </div>
    )
  }
}
