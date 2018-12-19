import React, { Component } from "react";
import axios from "axios";
import "./YourRoutes.css";

// import MyFancyComponent from "../../Map/Map";
import MapTest from "../../Map/MapTest";
import TestMapasBorrar from "../../Map/TestMapasBorrar";

// import { div } from "gl-matrix/src/gl-matrix/vec2";

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
    console.log(this.state.userRoutes);
  }

  // PETICIÓN DE TODAS LAS RUTAS DEL USUARIO
  getUserRoutes = () => {
    return this.service
      .get("/")
      .then(response => {
        console.log(response.data.track);
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
  };

  showAllYourRoutes = ()=>{
    this.setState({...this.state, showRouteData: null})
  }

  render() {
    console.log(this.state.showRouteData);

    const userRoutes = this.state.userRoutes
      ? this.state.userRoutes.map((track, index) => {
          return (
            <div
              onClick={() => this.showRoutesDetails(track)}
              style={{ border: "1px solid blue" }}
              key={track._id}
            >
              <h3>Name: {track.routesName}</h3>
              <p>Category: {track.category} </p>

              <img src={track.image} alt="image" />
              <form onSubmit={e => this.handleFormSubmitUPDATE(e, track._id)}>
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
                <br />
                <br />
                <br />
              </form>
              {/* <img src={`${track.image_url}`} style={{ width: "10%" }} /> */}
              <br />
              <form onSubmit={e => this.deleteRoute(e, track._id)}>
                <input value="DELETE" type="submit" />
              </form>
              <br />
              <br />
            </div>
          );
        })
      : "no hay rutas";

    const showRouteDetails = this.state.showRouteData;
    const showRouteData = showRouteDetails ? (
      <div id="yourRoutes-container">
        <div id="menu-routes-container" >
          {this.state.userRoutes.map(userRoute => {
            return (
              <div className="each-route-container" onClick={() => this.showRoutesDetails(userRoute)}>
                <h3>{userRoute.routesName}</h3>
                <h4>{userRoute.date}</h4>
              </div>
            );
          })}
          <button onClick={this.showAllYourRoutes}>
            Mostrar todas tus rutas
          </button>
        </div>
        <div id="stops-container">
          {this.state.showRouteData.restaurants.map(
            (restaurantOfRoute, index) => {
              return (
                <div className="each-stop-container">
                  <img src={restaurantOfRoute.restaurantPhoto} />
                  <h2>
                    Parada {index + 1}: {restaurantOfRoute.restaurantName}
                  </h2>
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
      <div>
        <hr />
        <h1>Tus rutas</h1>

        <br />
        <br />
        <br />

        {showRouteData}
        {/* <MyFancyComponent /> */}
        {<MapTest sendRouteData={this.state.showRouteData} />}

        {/* Borrar componente TestMapasBorrar y archivo una vez echas las pruebas */}
        {/* {<TestMapasBorrar />}  */}
      </div>
    );
  }
}
