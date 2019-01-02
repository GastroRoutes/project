import React, { Component } from "react";
import axios from "axios";
import "./YourRoutes.css";
import MapTest from "../../Map/MapTest";

export default class YourRoutes extends Component {
  constructor(props) {
    super(props);
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/tracks`,
      withCredentials: true
    });

    this.state = {
      createRoutes: {
        routesName: "",
        category: "",
        routesType: ""
      },
      userRoutes: [{}],
      restaurant: null,
      showRouteData: null
    };
    this.routes = [];
    this.getUserRoutes();
  }

  // PETICIÓN DE TODAS LAS RUTAS DEL USUARIO
  getUserRoutes = () => {
    return this.service
      .get("/")
      .then(response => {
        let userRoutesArr = response.data.track.createdTrack;
        this.setState({ ...this.state, userRoutes: userRoutesArr });
        return response;
      })
      .catch(err => console.log(err));
  };

  // CREAR RUTAS
  handleFormSubmit = e => {
    e.preventDefault();
    const { routesName, category, routesType } = this.state.createRoutes;
    this.getRoute({ routesName, category, routesType }).then(route => {
      let id = route.data._id;
      // console.log(route.data._id)
      this.props.createRoutes(route.data);
      // this.setState({ ...this.state, id }); /// hay que tratarlo. Llega como array
      this.getUserRoutes();
    });
  };

  // handleChangeCREATE = e => {
  //   const { name, value } = e.target;
  //   let newRoute = this.state.createRoutes;
  //   newRoute[name] = value;
  //   console.log(newRoute);
  //   this.setState({ ...this.state, createRoutes: newRoute });
  // };

  getRoute = route => {
    return this.service.post("/createTrack", route).then(response =>
      // response)
      {
        // console.log(response)
        return response;
      }
    );
  };

  // ACTUALIZAR RUTAS
  handleFormSubmitUPDATE = (e, id) => {
    e.preventDefault();
    const { routesName, category, routesType } = this.state.createRoutes;
    this.updateRoute({ routesName, category, routesType }, id).then(route => {
      console.log(route.data.routesName);
      this.getUserRoutes();
      // this.props.getRoute(route.data.routesName) /// hay que tratarlo. Llega como array
    });
  };

  handleChangeUPDATE = e => {
    const { name, value } = e.target;
    let newRoute = this.state.createRoutes;
    newRoute[name] = value;
    console.log(newRoute);
    this.setState({ ...this.state, createRoutes: newRoute });
  };

  updateRoute = (route, id) => {
    return this.service.post(`/${id}/update`, route).then(response => {
      return response;
    });
  };

  // BORRAR RUTAS
  deleteRoute = (e, id) => {
    e.preventDefault();
    return this.service.post(`/${id}/delete`, id).then(response => {
      this.getUserRoutes();
      return response;
    });
  };

  // showRoutesDetails = route => {
  //   console.log("entra");
  //   this.state.showRouteData
  //     ? this.setState({ ...this.state, showRouteData: null })
  //     : this.setState({ ...this.state, showRouteData: route });
  // };
  showRoutesDetails = route => {
    this.setState({ ...this.state, showRouteData: route });
    this.props.scrollToRecipe()
  };

  showAllYourRoutes = () => {
    this.setState({ ...this.state, showRouteData: null });
  };

  componentDidMount(){
    this.props.scrollToRecipe()
  }
  render() {
    console.log(this.state.showRouteData);

    const userRoutes = this.state.userRoutes ? (
      <div className="show-route-container">
        {this.state.userRoutes.map((track, index) => {
          return (
            <div className="yourRoutes-container" key={track._id}>
              <div>
                <div
                  className="each-Route"
                  onClick={() => this.showRoutesDetails(track)}
                  style={{ backgroundImage: `url(${track.image})` }}
                >
                  <div className="route-details">
                    <h3>{track.routesName}</h3>
                    <p>Categoría: {track.category}</p>
                  </div>
                </div>
              </div>
              <form
                className="form-container"
                onSubmit={e => this.handleFormSubmitUPDATE(e, track._id)}
              >
                <label>Actualizar rutas: </label>
                <input
                  type="text"
                  name="routesName"
                  onChange={e => this.handleChangeUPDATE(e)}
                  placeholder="Nombre de la ruta"
                  autoComplete="off"
                />
                <input
                  type="text"
                  name="category"
                  onChange={e => this.handleChangeUPDATE(e)}
                  placeholder="Categoría"
                  autoComplete="off"
                />
                <input
                  type="text"
                  name="routesType"
                  onChange={e => this.handleChangeUPDATE(e)}
                  placeholder="Tipo de ruta"
                  autoComplete="off"
                />
                {/* <input
          type="file"
          name="Photo"
          onChange={e => this.handleChangeUPDATE(e)}
        /> */}
                <input type="submit" />
                {/* <input type="text" name="location" onChange={e => this.handleChange(e)} /> */}
              </form>
              {/* <img src={`${track.image_url}`} style={{ width: "10%" }} /> */}

              <form
                className="form-delete"
                onSubmit={e => this.deleteRoute(e, track._id)}
              >
                <input value="X" type="submit" />
              </form>
            </div>
          );
        })}
      </div>
    ) : (
      "no hay rutas"
    );

    const showRouteDetails = this.state.showRouteData;
    const showRouteData = showRouteDetails ? (
      <div className="menu-half-routes">
        <div className="menu-routes-container">
          <h3>Rutas:</h3>
          {this.state.userRoutes.map(userRoute => {
            console.log(userRoute);
            return (
              <div
                className="each-route-container"
                onClick={() => this.showRoutesDetails(userRoute)}
              >
                <h4>{userRoute.routesName}</h4>
                <h5>Categoría :{userRoute.category}</h5>
                <h5>Duración: {userRoute.duration}</h5>
                <h5>Fecha: {userRoute.date}</h5>
                <h5>Hora inicio: {userRoute.hour}</h5>
                <hr />
              </div>
            );
          })}
          <button onClick={this.showAllYourRoutes}>
            Mostrar todas tus rutas
          </button>
        </div>

        <div id="stops-container">
          <h3>Itinerario:</h3>
          {this.state.showRouteData.restaurants.map(
            (restaurantOfRoute, index) => {
              return (
                <div className="each-stop-container">
                  <img src={restaurantOfRoute.restaurantPhoto} />
                  <h2>
                    <img src="./images/ImportedLayers.png" alt="" /> {index + 1}
                    : {restaurantOfRoute.restaurantName}
                  </h2>
                  <h4>
                    Puntuación: {restaurantOfRoute.rating}, {" "}Precio:{" "}
                    {restaurantOfRoute.price}, Teléfono:{" "}
                    {restaurantOfRoute.phone}{" "}
                  </h4>
                </div>
              );
            }
          )}
        </div>
      </div>
    ) : (
      <div>{userRoutes}</div>
    );

    return (
      <div className="yourRoutes-big-container">
        <h1>Tus rutas</h1>
        {showRouteData}
        <div className="map">
          {<MapTest sendRouteData={this.state.showRouteData} />}
        </div>
        {/* Borrar componente TestMapasBorrar y archivo una vez echas las pruebas */}
        {/* {<TestMapasBorrar />}  */}
      </div>
    );
  }
}
