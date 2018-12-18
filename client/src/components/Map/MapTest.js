/* eslint-disable no-undef */
/* global google */
import React, { Component } from "react";
import { FaAnchor } from "react-icons/fa";

import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  InfoWindow,
  Marker,
} from "react-google-maps";

// const sendRouteData = this.props.sendRouteData.restaurants;
// console.log(sendRouteData);
const demoFancyMapStyles = require("./demoFancyMapStyles.json");

const MapWithADirectionsRenderer = compose(
  
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyB8NzS5RBf23YH2cAwWi8t0HlpwPfqB6no&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const restaurants = this.props.sendRouteData.restaurants;
      const DirectionsService = new google.maps.DirectionsService();


      DirectionsService.route({
        origin: new google.maps.LatLng(restaurants[0].coordinates.latitude, restaurants[0].coordinates.longitude),
        destination: new google.maps.LatLng(restaurants[restaurants.length-1].coordinates.latitude, restaurants[restaurants.length-1].coordinates.longitude),
        travelMode: google.maps.TravelMode.WALKING,
        waypoints: restaurants.map((restaurant,index) =>{
          if(index !== 0 || index !== restaurants.length-1){
            return (
              {
                 location: new google.maps.LatLng(restaurant.coordinates.latitude,restaurant.coordinates.longitude)
              }
            )
          }
        })
     }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
           this.setState({
              directions: result,
           });
        } else {
          console.error(`error fetching directions ${result}`);
        }
     });
    }
  })
)(props => (
  
  <GoogleMap
    defaultZoom={7}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
    defaultOptions={{ styles: demoFancyMapStyles }}
  >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
    <Marker
      position={{ lat: -34.397, lng: 150.644 }}
      onClick={props.onToggleOpen}
    >
      {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
        <FaAnchor />
      </InfoWindow>}
    </Marker>
  </GoogleMap>
));


export default class MapTest extends Component {
  constructor(props){
    super(props)
    this.state ={
      data: this.props
    }

  }
  
  render() {
    console.log(this.props)
    if(this.props.sendRouteData){
      return (
        <div>
          <MapWithADirectionsRenderer sendRouteData={this.props.sendRouteData}/>
        </div>
      );

    }else{
      return <p>Loading...</p>
    }
  }
}
