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
      let restaurants = this.props.sendRouteData.restaurants;
      const DirectionsService = new google.maps.DirectionsService();
      // console.log(restaurants)
      DirectionsService.route({
        origin: new google.maps.LatLng(restaurants[0].coordinates.latitude, restaurants[0].coordinates.longitude),
        destination: new google.maps.LatLng(restaurants[restaurants.length-1].coordinates.latitude, restaurants[restaurants.length-1].coordinates.longitude),
        travelMode: google.maps.TravelMode.WALKING,
        waypoints: restaurants.map((restaurant,index) => {
          if(index !== 0 || index !== restaurants.length-1){
            console.log(restaurant)
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
    },
    componentDidUpdate(preProps) {
      let restaurants = this.props.sendRouteData.restaurants;
      const DirectionsService = new google.maps.DirectionsService();
      // console.log(restaurants)
      DirectionsService.route({
        origin: new google.maps.LatLng(restaurants[0].coordinates.latitude, restaurants[0].coordinates.longitude),
        destination: new google.maps.LatLng(restaurants[restaurants.length-1].coordinates.latitude, restaurants[restaurants.length-1].coordinates.longitude),
        travelMode: google.maps.TravelMode.WALKING,
        waypoints: restaurants.map((restaurant,index) => {
          if(index !== 0 || index !== restaurants.length-1){
            console.log(restaurant)
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
    defaultOptions={{ styles:[
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#212121"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#212121"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.business",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#181818"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1b1b1b"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#2c2c2c"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8a8a8a"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#373737"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#3c3c3c"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#4e4e4e"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "transit",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#000000"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#3d3d3d"
          }
        ]
      }
    ]
    
    
    
    }}
  >

    {props.directions && <DirectionsRenderer directions={props.directions} options= {{polylineOptions: { strokeColor: "orange"}}} />}

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
  // constructor(props){
  //   super(props)
    

  // }
  
  render() {
    if(this.props.sendRouteData){
      // console.log(this.props.sendRouteData)
      return (
        <div>
          <MapWithADirectionsRenderer sendRouteData={this.props.sendRouteData}/>
        </div>

      );

    }else{
      return <p></p>
    }
  }
}
