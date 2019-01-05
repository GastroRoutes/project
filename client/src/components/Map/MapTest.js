/* eslint-disable no-undef */
/* global google */
import React, { Component } from "react";
import { FaAnchor } from "react-icons/fa";
import "./Map.css"

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
const MapStyle = require("./MapStyle.json");

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
      
      let waypointsArr = []
         restaurants.map((restaurant,index) => {
           console.log(restaurant)
          if((index !== 0) && (index !== (restaurants.length-1))){
            waypointsArr.push({location: new google.maps.LatLng(restaurant.coordinates.latitude,restaurant.coordinates.longitude)})           
          }
        })
        console.log(waypointsArr)
        
      DirectionsService.route({
        origin: new google.maps.LatLng(restaurants[0].coordinates.latitude, restaurants[0].coordinates.longitude),
         waypoints: waypointsArr,
        // restaurants.map((restaurant,index) => {
       
        //   // if((index !== 0) || (index !== restaurants.length-1)){
        //     // console.log(restaurant)
        //     console.log("holaa",index, restaurant)
        //     return (
        //       {
        //           location: new google.maps.LatLng(restaurant.coordinates.latitude,restaurant.coordinates.longitude)
        //       }
        //     )
        //   // }
        // }),
        destination: new google.maps.LatLng(restaurants[restaurants.length-1].coordinates.latitude, restaurants[restaurants.length-1].coordinates.longitude),
        travelMode: google.maps.TravelMode.WALKING,
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
      let waypointsArr = []
      restaurants.map((restaurant,index) => {
        console.log(restaurant)
       if((index !== 0) && (index !== (restaurants.length-1))){
         waypointsArr.push({location: new google.maps.LatLng(restaurant.coordinates.latitude,restaurant.coordinates.longitude)})           
       }
     })
      const DirectionsService = new google.maps.DirectionsService();
      // console.log(restaurants)
      DirectionsService.route({
        origin: new google.maps.LatLng(restaurants[0].coordinates.latitude, restaurants[0].coordinates.longitude),
        destination: new google.maps.LatLng(restaurants[restaurants.length-1].coordinates.latitude, restaurants[restaurants.length-1].coordinates.longitude),
        travelMode: google.maps.TravelMode.WALKING,
        waypoints: waypointsArr
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
    defaultOptions={{styles: MapStyle}}


//[
//       {
//           "featureType": "all",
//           "elementType": "labels.text.fill",
//           "stylers": [
//               {
//                   "saturation": 36
//               },
//               {
//                   "color": "#000000"
//               },
//               {
//                   "lightness": 40
//               }
//           ]
//       },
//       {
//           "featureType": "all",
//           "elementType": "labels.text.stroke",
//           "stylers": [
//               {
//                   "visibility": "on"
//               },
//               {
//                   "color": "#000000"
//               },
//               {
//                   "lightness": 16
//               }
//           ]
//       },
//       {
//           "featureType": "all",
//           "elementType": "labels.icon",
//           "stylers": [
//               {
//                   "visibility": "off"
//               }
//           ]
//       },
//       {
//           "featureType": "administrative",
//           "elementType": "geometry.fill",
//           "stylers": [
//               {
//                   "color": "#000000"
//               },
//               {
//                   "lightness": 20
//               }
//           ]
//       },
//       {
//           "featureType": "administrative",
//           "elementType": "geometry.stroke",
//           "stylers": [
//               {
//                   "color": "#000000"
//               },
//               {
//                   "lightness": 17
//               },
//               {
//                   "weight": 1.2
//               }
//           ]
//       },
//       {
//           "featureType": "administrative.locality",
//           "elementType": "labels",
//           "stylers": [
//               {
//                   "visibility": "off"
//               }
//           ]
//       },
//       {
//           "featureType": "administrative.neighborhood",
//           "elementType": "labels",
//           "stylers": [
//               {
//                   "visibility": "simplified"
//               }
//           ]
//       },
//       {
//           "featureType": "administrative.neighborhood",
//           "elementType": "labels.text.fill",
//           "stylers": [
//               {
//                   "lightness": "17"
//               }
//           ]
//       },
//       {
//           "featureType": "administrative.land_parcel",
//           "elementType": "labels",
//           "stylers": [
//               {
//                   "visibility": "off"
//               }
//           ]
//       },
//       {
//           "featureType": "landscape",
//           "elementType": "geometry",
//           "stylers": [
//               {
//                   "color": "#000000"
//               },
//               {
//                   "lightness": 20
//               }
//           ]
//       },
//       {
//           "featureType": "landscape",
//           "elementType": "labels",
//           "stylers": [
//               {
//                   "visibility": "on"
//               }
//           ]
//       },
//       {
//           "featureType": "landscape.man_made",
//           "elementType": "labels",
//           "stylers": [
//               {
//                   "visibility": "off"
//               }
//           ]
//       },
//       {
//           "featureType": "landscape.man_made",
//           "elementType": "labels.text",
//           "stylers": [
//               {
//                   "visibility": "off"
//               }
//           ]
//       },
//       {
//           "featureType": "landscape.natural",
//           "elementType": "labels",
//           "stylers": [
//               {
//                   "visibility": "on"
//               }
//           ]
//       },
//       {
//           "featureType": "poi",
//           "elementType": "geometry",
//           "stylers": [
//               {
//                   "color": "#000000"
//               },
//               {
//                   "lightness": 21
//               }
//           ]
//       },
//       {
//           "featureType": "poi",
//           "elementType": "labels",
//           "stylers": [
//               {
//                   "visibility": "off"
//               }
//           ]
//       },
//       {
//           "featureType": "road",
//           "elementType": "labels",
//           "stylers": [
//               {
//                   "visibility": "simplified"
//               }
//           ]
//       },
//       {
//           "featureType": "road.highway",
//           "elementType": "geometry",
//           "stylers": [
//               {
//                   "visibility": "on"
//               },
//               {
//                   "color": "#ff4700"
//               }
//           ]
//       },
//       {
//           "featureType": "road.highway",
//           "elementType": "geometry.fill",
//           "stylers": [
//               {
//                   "lightness": 17
//               }
//           ]
//       },
//       {
//           "featureType": "road.highway",
//           "elementType": "geometry.stroke",
//           "stylers": [
//               {
//                   "color": "#000000"
//               },
//               {
//                   "lightness": 29
//               },
//               {
//                   "weight": 0.2
//               }
//           ]
//       },
//       {
//           "featureType": "road.highway",
//           "elementType": "labels",
//           "stylers": [
//               {
//                   "invert_lightness": true
//               },
//               {
//                   "visibility": "off"
//               }
//           ]
//       },
//       {
//           "featureType": "road.highway.controlled_access",
//           "elementType": "geometry.fill",
//           "stylers": [
//               {
//                   "color": "#3b3b3b"
//               }
//           ]
//       },
//       {
//           "featureType": "road.arterial",
//           "elementType": "geometry",
//           "stylers": [
//               {
//                   "color": "#000000"
//               },
//               {
//                   "lightness": 18
//               }
//           ]
//       },
//       {
//           "featureType": "road.arterial",
//           "elementType": "geometry.fill",
//           "stylers": [
//               {
//                   "color": "#ff4700"
//               },
//               {
//                   "lightness": "39"
//               },
//               {
//                   "gamma": "0.43"
//               },
//               {
//                   "saturation": "-47"
//               }
//           ]
//       },
//       {
//           "featureType": "road.arterial",
//           "elementType": "labels",
//           "stylers": [
//               {
//                   "visibility": "off"
//               }
//           ]
//       },
//       {
//           "featureType": "road.local",
//           "elementType": "geometry",
//           "stylers": [
//               {
//                   "color": "#000000"
//               },
//               {
//                   "lightness": 16
//               }
//           ]
//       },
//       {
//           "featureType": "road.local",
//           "elementType": "geometry.stroke",
//           "stylers": [
//               {
//                   "color": "#555555"
//               }
//           ]
//       },
//       {
//           "featureType": "road.local",
//           "elementType": "labels",
//           "stylers": [
//               {
//                   "visibility": "off"
//               }
//           ]
//       },
//       {
//           "featureType": "transit",
//           "elementType": "geometry",
//           "stylers": [
//               {
//                   "color": "#000000"
//               },
//               {
//                   "lightness": 19
//               }
//           ]
//       },
//       {
//           "featureType": "water",
//           "elementType": "geometry",
//           "stylers": [
//               {
//                   "color": "#000000"
//               },
//               {
//                   "lightness": 17
//               }
//           ]
//       }
//   ]
    
    
    
//     }}
  >

    {props.directions && <DirectionsRenderer directions={props.directions} options= {{polylineOptions: { strokeColor: "orange"}}} />}
{/* 
    <Marker
      position={{ lat: -34.397, lng: 150.644 }}
      onClick={props.onToggleOpen}
      options={{icon:'../../../public/images/icono.jpg'}}
    >
      {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
        <FaAnchor />
      </InfoWindow>}
    </Marker> */}
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
