import React, { Component } from "react";
import axios from "axios";
import YourRoutes from "../YourRoutes/YourRoutes";
import CreateRoutes from "../CreateRoutes/CreateRoutes";
import { div } from "gl-matrix/src/gl-matrix/vec2";
import "./Profile.css";
import SavedRoutes from "../YourRoutes/SavedRoutes/SavedRoutes";

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
      showUpdateProfileButton: null,
      yourRoutes: true
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
    if (name === "photo") {
      user[name] = e.target.files[0];
      this.setState({ ...this.state, user });
    } else {
      user[name] = value;
      this.setState({ ...this.state, user });
    }
  };

  updateProfile = user => {
    console.log(user);
    const formData = new FormData();
    Object.keys(user).forEach(key => formData.append(key, user[key]));

    return this.service
      .post("/details", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        this.props.getUser(response.data);
      });
  };
  createRouteButton = () => {
    this.state.createRoutesToggle
      ? this.setState({ ...this.state, createRoutesToggle: null })
      : 
        this.setState({ ...this.state, createRoutesToggle: true });
        this.scrollToRecipe()
  };

  createRoutes = route => {
    this.setState({ ...this.state, createRoutesToggle: null });
  };

  showUpdateProfileButton = () => {
    this.state.showUpdateProfileButton
      ? this.setState({ ...this.state, showUpdateProfileButton: null })
      : this.setState({ ...this.state, showUpdateProfileButton: true });
  };

  changeRoutes = () => {
    this.state.yourRoutes
      ? this.setState({ ...this.state, yourRoutes: null })
      : this.setState({ ...this.state, yourRoutes: true });
      this.scrollToRecipe()
  };
  scrollToRecipe = () => {
    window.scrollBy({
      top: document.querySelector("body").clientHeight, // could be negative value
      left: 0,
      behavior: "smooth"
    });
  };
  componentDidMount(){
    this.scrollToRecipe()
  }
  render() {
    const showRoutesType = this.state.yourRoutes ? (
      <div>
        <button className="align-buttoms" onClick={this.changeRoutes}>Rutas Guardadas</button>
        <YourRoutes
          scrollToRecipe={this.scrollToRecipe}
          userRoutes={this.userRoutes}
          createRoutes={this.props.createRoutes}
          handleFormSubmit={this.handleFormSubmit}
          handleChange={this.handleChange}
        />
      </div>
    ) : (
      <div>
        <button className="align-buttoms" onClick={this.changeRoutes}>Tus publicaciones</button>
        <SavedRoutes user={this.state.user} />
      </div>
    );
    const createRoutesOrShowRoutes = this.state.createRoutesToggle ? (
      <section className="routes-from-profile">
        <button className="align-buttoms" onClick={this.createRouteButton}>Tus rutas</button>
        <CreateRoutes
          scrollToRecipe={this.scrollToRecipe}
          createRoutes={this.createRoutes}
          getRoutes={this.getRoutes}
          state={this.state}
        />
      </section>
    ) : (
      <div>
        <button className="align-buttoms" onClick={this.createRouteButton}>Crear Ruta</button>
        {showRoutesType}
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
            type="text"
            name="taste"
            autoComplete="off"
            placeholder="Tus gustos"
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
        <div id="profile-details">
          <img id="profile-photo" src={this.state.user.imgPath} alt="" />
          <div id="profile-details-container">
            <h1>{this.state.user.username}</h1>
            {showUpdateProfile}
          </div>
        </div>
          <hr className="big-hr"/>

        {createRoutesOrShowRoutes}
        {/* {createRoute} */}
      </div>
    );
  }
}
