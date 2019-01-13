import React, { Component } from "react";
import axios from "axios";
import YourRoutes from "../YourRoutes/YourRoutes";
import CreateRoutes from "../CreateRoutes/CreateRoutes";
import "./Profile.css";
import SavedRoutes from "../YourRoutes/SavedRoutes/SavedRoutes";
import { Link } from "react-router-dom";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
      withCredentials: true
    });
    this.state = {
      user: this.props.user,
      userRoutes: this.props.user,
      createRoutesToggle: null,
      showUpdateProfileButton: false,
      yourRoutes: true,
      rating: null,
      votes: null
    };
    this.getUserRoutes();
  }
  getUserRoutes = () => {
    return this.service
      .get("/tracks")
      .then(response => {
        let userRoutesArr = response.data.track.createdTrack;
        let eachRating = [];
        userRoutesArr.forEach(route => {
          return eachRating.push(
            route.qualification.reduce((a, b) => a + b) /
              route.qualification.length
          );
        });
        let eachRatingAvarage =
          eachRating.reduce((a, b) => a + b) / eachRating.length;
        let eachRatingAvarageFixed = eachRatingAvarage.toFixed(1);

        this.setState({ ...this.state, rating: eachRatingAvarageFixed });
        let allratingsLength = [];
        userRoutesArr.forEach(route =>
          allratingsLength.push(route.qualification.length)
        );
        let votes = allratingsLength.reduce((a, b) => a + b);
        this.setState({ ...this.state, votes: votes });
      })
      .catch(err => console.log(err));
  };

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
      .post("/editProfile/details", formData, {
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
      : this.setState({ ...this.state, createRoutesToggle: true });
    this.scrollToRecipe();
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
    this.scrollToRecipe();
  };
  scrollToRecipe = () => {
    window.scrollBy({
      top: document.querySelector("body").clientHeight, // could be negative value
      left: 0,
      behavior: "smooth"
    });
  };

  render() {
    let ratingArr
    let decimalsRating
    let integerRating
    if(this.state.rating){
      ratingArr = this.state.rating.toString().split(".")
      decimalsRating = ratingArr[1];
      integerRating = ratingArr[0];
    }

    const showRoutesType = this.state.yourRoutes ? (
      <div>
        <button className="align-buttoms" onClick={this.changeRoutes}>
          Rutas Guardadas
        </button>
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
        <button className="align-buttoms" onClick={this.changeRoutes}>
          Tus publicaciones
        </button>
        <SavedRoutes user={this.state.user} />
      </div>
    );
    const createRoutesOrShowRoutes = this.state.createRoutesToggle ? (
      <section className="routes-from-profile">
        <button
          className="align-buttoms fix-button"
          onClick={this.createRouteButton}
        >
          Tus rutas
        </button>
        <CreateRoutes
          scrollToRecipe={this.scrollToRecipe}
          createRoutes={this.createRoutes}
          getRoutes={this.getRoutes}
          state={this.state}
        />
      </section>
    ) : (
      <div>
        <button className="align-buttoms" onClick={this.createRouteButton}>
          Crear Ruta
        </button>
        {showRoutesType}
      </div>
    );

    const showUpdateProfile = this.state.showUpdateProfileButton ? (
      <div>
        <button className="center-block" onClick={this.showUpdateProfileButton}>
          Volver
        </button>
        <div>
          <form
            className="flex-row appear"
            onSubmit={e => this.handleFormSubmit(e)}
          >
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
              value="Tus gustos"
            />

            <input
              className="file-input"
              type="file"
              name="photo"
              onChange={e => this.handleChange(e)}
            />

            <br />
            <div>
              <input type="submit" value="Actualizar" />
            </div>
          </form>
        </div>
      </div>
    ) : (
      <button className="center-block" onClick={this.showUpdateProfileButton}>
        Editar perfil
      </button>
    );

    return (
      <div>
        <div id="profile-details">
          <div className="row">
            <div className="profile-photo">
              <img src={this.state.user.imgPath} alt="" />
            </div>

            <div className="profile-content">
              <div className="name-and-rating">
                <div id="profile-details-container">
                  <h1 className="fix-h1">{this.state.user.username}</h1>
                  <h4>{this.state.user.email}</h4>
                </div>
                <div className="social-position">
                  <Link to={"/ranking"} className="link">
                    <div className="center-column">
                      <h2 className="rating">
                        {this.state.user.rankingPosition}º
                      </h2>
                      <p>Clasificación</p>
                    </div>
                  </Link>
                  <div className="center-column">
                    <h2 className="rating">{this.state.votes}</h2>
                    <p>Votos</p>
                  </div>
                  <div className="center-column">
                    <h2 className="rating">{decimalsRating}'<sup className="superindex-profile">{integerRating}</sup></h2>
                    <p>Media de votos</p>
                  </div>
                </div>
              </div>
              {showUpdateProfile}
            </div>
          </div>
        </div>

        {createRoutesOrShowRoutes}
        {/* {createRoute} */}
      </div>
    );
  }
}
