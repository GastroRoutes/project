import React, { Component } from "react";
import axios from "axios";

export default class AllRoutes extends Component {
  constructor() {
    super();
    this.state = {
      allRoutes: null,
      showGreenTickOk : null
    };
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/tracks`,
      withCredentials: true
    });
    this.getAllRoutes();
  }

  getAllRoutes = () => {
    this.service.get("/allRoutes")
    .then(response => {
      this.setState({ ...this.state, allRoutes: response.data.track });
      
    })

  };

  followTrack = (e, id) => {
    // debugger
    e.preventDefault()
    return this.service.post(`/${id}/followRoutes`, id) //le paso la id del track
    .then((response)=> {
      console.log(response)
      // this.props.getUser()
      if (response.data.followed){
        this.setState({...this.state, showGreenTickOk: true})
        console.log(this.state.showGreenTickOk)
      }
      else{
        this.setState({...this.state, showGreenTickOk: true})
      }
    })

  }

  render() {

    const printAllRoutes = this.state.allRoutes ? (
      this.state.allRoutes.map(element => {
        return (
          <div>
            <h2>{element.routesName}</h2>
            <h3>{element.routesType}</h3>
            <h4>{element.category}</h4>
            {/* <p>{element.creatorID[0].username}</p> */}
            <img src={element.image} alt=""/>
          {!this.state.showGreenTickOk ? (
      <button onClick={e => this.followTrack(e, element._id)}>follow</button>
    ) : (
      <button style={{backgroundColor: "green"}}onClick={e => this.followTrack(e, element._id)}>follow</button>
    )}
            <hr />
          </div>
        );
      })
    ) : (
      <h1>Cargando...</h1>
    );
    return (
      <div>
        Contenedor de Rutas
        {printAllRoutes}
      </div>
    );
  }
}
