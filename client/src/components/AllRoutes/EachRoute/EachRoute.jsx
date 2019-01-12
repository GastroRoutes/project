import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class EachRoute extends Component {
  constructor(props) {
    super(props);

    
  }
  render() {

    const element = this.props.element;
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
        <div className="form-container margin-bottom-container-routes">
          <h3>{element.routesName}</h3>
          {/* <h3>{element.routesType}</h3> */}
          {/* <h4>{element.category}</h4> */}
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
          {/* <p>{element.creatorID[0].username}</p> */}
          <button
            className="follow-button"
            onClick={e => this.props.followTrack(e, element._id)}
          >
            Guardar
          </button>
          <form>
            <select
              name="qualification"
              onChange={e => this.props.assessRoute(e, element._id)}
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
