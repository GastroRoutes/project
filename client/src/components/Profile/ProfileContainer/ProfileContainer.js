import React, { Component } from "react";
import axios from "axios";
import YourRoutes from "../YourRoutes/YourRoutes";
import CreateRoutes from "../CreateRoutes/CreateRoutes";
import { div } from "gl-matrix/src/gl-matrix/vec2";
import "./Profile.css"

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/editProfile`,
      withCredentials: true
    });
    this.state = {
      user: this.props.user,
      userRoutes: this.props.user,
      createRoutesToggle: null,
      showUpdateProfileButton: null
    };
  }

  handleFormSubmit = e => {
    e.preventDefault();
    const { username, email, photo } = this.state.user;
    this.updateProfile({ username, email, photo });
  };

  handleChange = e => {
    const user = { ...this.state.user };
    const { name, value } = e.target;
    if(name === "photo") {
      user[name] = e.target.files[0]

      this.setState({...this.state, user})
      console.log(this.state.user);
    } else {
      user[name] = value;
      this.setState({ ...this.state, user });
    }
  };

  updateProfile = user => {
    // return this.service
    //   .post("/details", user)
    //   .then(response => console.log(response));
    const formData = new FormData();
    Object.keys(user).forEach(key => formData.append(key, user[key]));

    return this.service.post('/details', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
  })
  .then(response => console.log(response.data))
}
  createRouteButton = () => {
    this.state.createRoutesToggle
      ? this.setState({ ...this.state, createRoutesToggle: null })
      : this.setState({ ...this.state, createRoutesToggle: true });
  };

  createRoutes = route => {
    this.setState({ ...this.state, createRoutesToggle: null });
  };

  showUpdateProfileButton = () => {
    this.state.showUpdateProfileButton
      ? this.setState({ ...this.state, showUpdateProfileButton: null })
      : this.setState({ ...this.state, showUpdateProfileButton: true });
  };
  
  render() {
    const createRoutesOrShowRoutes = this.state.createRoutesToggle ? (
      <div>
        <button onClick={this.createRouteButton}>Tus rutas</button>
        <CreateRoutes
          createRoutes={this.createRoutes}
          getRoutes={this.getRoutes}
          state={this.state}
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

    const showUpdateProfile = this.state.showUpdateProfileButton ? (
      <div>
        <button onClick={this.showUpdateProfileButton}>Volver</button>
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
            type="file"
            name="photo"
            onChange={e => this.handleChange(e)}
          />
          <input type="submit" value="Update Profile" />
        </form>
      </div>
    ) : (
      <button onClick={this.showUpdateProfileButton}>Editar perfil</button>
    );
    return (
      <div>
        <h1>{this.state.user.username}</h1>
        <img id="profile-photo"src={this.state.user.imgPath} alt=""/>
        {showUpdateProfile}

        {createRoutesOrShowRoutes}
        {/* {createRoute} */}
      </div>
    );
  }
}
