import React, { Component } from "react";
import { Link } from "react-router-dom";
import MapTest from "../../Map/MapTest";
import BurgerRanking from "../BurgerRanking/BurgerRanking";
export default class EachRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonShow: true,
      showMap: null,
      showMore: null,
      showMoreClase: "eachRoute-container"
    };
  }
  changeButtonState = () => {
    this.setState({ ...this.state, buttonShow: false });
  };
  showMap = () => {
    this.state.showMap
      ? this.setState({ ...this.state, showMap: null })
      : this.setState({ ...this.state, showMap: true });
  };
  showMore = () => {
    this.state.showMore
      ? this.setState({
          ...this.state,
          showMore: null,
          showMoreClasse: "eachRoute-container"
        })
      : this.setState({
          ...this.state,
          showMore: true,
          showMoreClasse: "eachRoute-containershowing"
        });
  };

  render() {
    const saveButton = this.state.buttonShow ? (
      <button
        className="follow-button"
        onClick={e => {
          this.props.followTrack(e, element._id);
          this.changeButtonState();
        }}
      >
        Añadir
      </button>
    ) : (
      <button className="follow-button savedRouteButton">Ruta añadida</button>
    );
    const element = this.props.element;
    let rating =
      element.qualification.reduce((a, b) => a + b) /
      element.qualification.length;
    let fixedRating = rating.toFixed(1);
    let separatedDecimalsArr = fixedRating.toString().split(".");
    let decimalsRating = separatedDecimalsArr[1];
    let integerRating = separatedDecimalsArr[0];
    let votes = element.qualification.length - 1;
    return (
      <div className="yourRoutes-container">
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
            <h3>{element.routesName}</h3>
            <br />
            <h5 className="rating">Puntuación:</h5>
            <h1 className="rating">
              {integerRating}
              <sup className="superindex">'{decimalsRating}</sup>
            </h1>
            <div className="burgerImageContainer">
              <BurgerRanking
                getAllRoutes={this.props.getAllRoutes}
                sendRating={this.sendRating}
                burgerImage={this.state.burgerImage}
                index="1"
                element={element}
              />
              <BurgerRanking
                getAllRoutes={this.props.getAllRoutes}
                sendRating={this.sendRating}
                burgerImage={this.state.burgerImage}
                index="2"
                element={element}
              />
              <BurgerRanking
                getAllRoutes={this.props.getAllRoutes}
                sendRating={this.sendRating}
                burgerImage={this.state.burgerImage}
                index="3"
                element={element}
              />
              <BurgerRanking
                getAllRoutes={this.props.getAllRoutes}
                sendRating={this.sendRating}
                burgerImage={this.state.burgerImage}
                index="4"
                element={element}
              />
              <BurgerRanking
                getAllRoutes={this.props.getAllRoutes}
                sendRating={this.sendRating}
                burgerImage={this.state.burgerImage}
                index="5"
                element={element}
              />
            </div>
            <p>votos: {votes}</p>
            {this.state.showMore ? (
              element.restaurants.map(restaurant => {
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
                    <h4 className="showMore pointer" onClick={this.showMore}>
                      Ocultar paradas
                    </h4>
                  </div>
                );
              })
            ) : (
              <h4 className="showMore pointer" onClick={this.showMore}>
                Ver paradas
              </h4>
            )}
            {this.state.showMap ? (
              <div>
                <MapTest sendRouteData={element} />
                <h4 className="pointer" onClick={this.showMap}>
                  Ocultar mapa
                </h4>
              </div>
            ) : (
              <h4 className="pointer" onClick={this.showMap}>
                Ver en el mapa
              </h4>
            )}
            <div className="appear" />
            {saveButton}
          </div>
        </div>
      </div>
    );
  }
}
