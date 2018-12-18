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
      restaurant: null
    };
    this.routes = [];
    this.getUserRoutes();
  }
  
  // PETICIÓN DE TODAS LAS RUTAS DEL USUARIO
  getUserRoutes = () => {
    return this.service.get("/")
    .then(response => {
      console.log(response.data.track);
      let userRoutesArr = response.data.track.createdTrack;
      this.setState({ ...this.state, userRoutes: userRoutesArr });
      return response;
    }).catch()
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
        // console.log(response)z
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
      return this.service.post(`/${id}/update`, route)
      .then(response => {
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

    // componentDidMount() {
    //   this.getRestaurants();
    //   console.log(this.getRestaurants())
    // }

    render() {
      const userRoutes = 
      this.state.userRoutes ? ( this.state.userRoutes.map(track => {
        return (
          <div style={{ border: "1px solid blue" }} key={track._id}>
            <h3>Name: {track.routesName}</h3>
            <p>Category: {track.category} </p>

            <img src={track.image} alt="image"/>
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
            <form onSubmit={(e) => this.deleteRoute(e, track._id)}>
            <input
              value="DELETE"
              type="submit"
            />
            </form>
            <br />
            <br />
          </div>
        );
      })) : ("no hay rutas")
      return (
        <div>
        <hr  />
        <h1>Tus rutas</h1>
        <h3>{this.state.routesName}</h3>
        <br />
        <br />
        <br />
{userRoutes}
       
       {/* <MyFancyComponent /> */}
       { <MapTest /> }


{/* Borrar componente TestMapasBorrar y archivo una vez echas las pruebas */}
       {<TestMapasBorrar />} 
      </div>
    );
  }
}
