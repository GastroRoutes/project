/* eslint-disable no-undef */
/* global google */
import React, { Component } from "react";
import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  
} from "react-google-maps";


const demoFancyMapStyles = require("./demoFancyMapStyles.json");
const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyB8NzS5RBf23YH2cAwWi8t0HlpwPfqB6no&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();


      DirectionsService.route({
        origin: new google.maps.LatLng(40.4166968528883, -3.70159499259034),
        destination: new google.maps.LatLng(43.3579649, -5.8733862),
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: [
             {
                location: new google.maps.LatLng(42.5735672, -5.5671588)
             },
             {
                location: new google.maps.LatLng(42.3499677,-3.6822051)
             }
        ]
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
  </GoogleMap>
));

export default class MapTest extends Component {
  render() {

    return (
      <div>
        <MapWithADirectionsRenderer />
      </div>
    );
  }
}
