import React, { Component } from "react";
import axios from "axios";
import YourRoutes from "../YourRoutes/YourRoutes";
import CreateRoutes from "../CreateRoutes/CreateRoutes";
import { div } from "gl-matrix/src/gl-matrix/vec2";
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.service = axios.create({
      baseURL: "http://localhost:5000/editProfile",
      withCredentials: true
    });
    this.state = {
      user: this.props.user,
      userRoutes: this.props.user,
      createRoutesToggle: null
    };
  }

  handleFormSubmit = e => {
    e.preventDefault();
    const { username, email, photo } = this.state.user;
    this.updateProfile({ username, email, photo });
  };

  handleChange = e => {
    const { name, value } = e.target;
    const user = { ...this.state.user };
    // console.log(e.target.value)
    console.log(this.state.user);
    user[name] = value;

    this.setState({ ...this.state, user });
  };

  updateProfile = user => {
    return this.service
      .post("/details", user)
      .then(response => console.log(response));
  };
  createRouteButton = () => {
    this.state.createRoutesToggle
      ? this.setState({ ...this.state, createRoutesToggle: null })
      : // this.setState({...this.state, createRoutes: null})
       ( this.setState({ ...this.state, createRoutesToggle: true }))
  };
  createRoutes = route => {
    this.setState({...this.state, createRoutesToggle: null})
  }

  render() {
    //       const createRoute = this.state.createRoutes? (
    // ):(  <button onClick={this.createRouteButton}>Crear Ruta</button>)
    const createRoutesOrShowRoutes = this.state.createRoutesToggle ? (
      <div>
        <button onClick={this.createRouteButton}>Tus rutas</button>
        <CreateRoutes
          createRoutes={this.createRoutes}
          getRoutes={this.getRoutes}
          state = {this.state}
        />
      </div>
    ) : (
      <div>
        <button onClick={this.createRouteButton}>Crear Ruta</button>
        <YourRoutes
          userRoutes={this.userRoutes}
          createRoutes={this.props.createRoutes}
          handleFormSubmit={this.handleFormSubmit}
          handleChange={this.handleChange}
        />
      </div>
    );
    return (
      <div>
        <h1>{this.state.user.username}</h1>

        <form onSubmit={e => this.handleFormSubmit(e)}>
          <input
            type="text"
            name="username"
            value={this.state.user.username}
            autoComplete="off"
            onChange={e => this.handleChange(e)}
          />

          <input
            type="email"
            name="email"
            value={this.state.user.email}
            autoComplete="off"
            onChange={e => this.handleChange(e)}
          />

          <input
            type="text"
            name="createdAt"
            value={this.state.user.created_at}
            autoComplete="off"
            onChange={e => this.handleChange(e)}
          />
          {/* <input type="password" name="password" value= {this.state.user.password} onChange={e => this.handleChange(e)} /> */}

          <input
            type="file"
            name="photo"
            onChange={e => this.handleChange(e)}
          />

          <input type="submit" value="Update Profile" />
        </form>
        {createRoutesOrShowRoutes}
        {/* {createRoute} */}
      </div>
    );
  }
}
