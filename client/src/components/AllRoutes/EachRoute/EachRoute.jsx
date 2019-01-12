import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class EachRoute extends Component {
  constructor(props) {
    super(props);
      this.state = {
        buttonShow: true
      }
    
    }
    changeButtonState = () => {
      this.setState({...this.state, buttonShow: false})
    }


  render() {
const saveButton = this.state.buttonShow ? (
  <button
  className="follow-button"
  onClick={e => {
    this.props.followTrack(e, element._id)
    this.changeButtonState()}}
>
  Añadir
</button>
) : (
  <button
  className="follow-button savedRouteButton"
>
  Ruta añadida
</button>
)
    const element = this.props.element;
    let rating = element.qualification.reduce((a,b)=> a+b)/element.qualification.length
    let fixedRating = rating.toFixed(1)
     
     let separatedDecimalsArr = fixedRating.toString().split(".")
     let decimalsRating = separatedDecimalsArr[1]
     let integerRating = separatedDecimalsArr[0]
    return (
      <div>
        <div
          className="each-Route"
          style={{ backgroundImage: `url(${element.image})` }}
        >
          <Link to={`/usersRoutes/${element.creatorID[0]._id}`}>
            <div className="show-user-on-routes">
              <img src={element.creatorID[0].imgPath} />
              <label className="margin-user-creator">
                {element.creatorID[0].username}
              </label>
            </div>
          </Link>
        </div>
        <div className="form-container margin-bottom-container-routes align-center">
          <h3>{element.routesName}</h3><br/>
          <h5 className="rating">Puntuación:</h5>
          <h1 className="rating">{integerRating}<sup className="superindex">'{decimalsRating}</sup></h1>
          <div className= "burgerImageContainer">
          <img onClick={()=>this.props.sendRating(1, element._id)} className="burgerImage" src="images/hamburger.png"/>
          <img onClick={()=>this.props.sendRating(2, element._id)} className="burgerImage" src="images/hamburger.png"/>
          <img onClick={()=>this.props.sendRating(3, element._id)} className="burgerImage" src="images/hamburger.png"/>
          <img onClick={()=>this.props.sendRating(4, element._id)} className="burgerImage" src="images/hamburger.png"/>
          <img onClick={()=>this.props.sendRating(5, element._id)} className="burgerImage" src="images/hamburger.png"/>
          </div>
          {element.restaurants.map(restaurant => {
            return (
              <div className="each-stop-on-target">
                <hr />

                <div className="flex-space-between">
                  <a href={restaurant.url}>
                    <h4>
                      <img src="./images/ImportedLayers.png" alt="" />
                      {restaurant.restaurantName}
                    </h4>
                  </a>
                </div>
                <div className="restaurant-detail-container">
                  <h5> Puntuación: {restaurant.rating}</h5>
                  <h5>{restaurant.location.city}</h5>
                </div>
              </div>
            );
          })}
          
          {saveButton}
          <form>
            <select
              name="qualification"
              onChange={e => this.props.sendRating(e, element._id)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </form>
        </div>
      </div>
    );
  }
}
