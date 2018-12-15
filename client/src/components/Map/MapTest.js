/* eslint-disable no-undef */
/* global google */
import React, { Component } from "react";
import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Polyline
} from "react-google-maps";


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
      const DirectionsService = new google.maps.DirectionsService();

      DirectionsService.route(
        {
          origin: new google.maps.LatLng(43.3579649, -5.8733862),
          destination: new google.maps.LatLng(40.41465, -3.7004),
          travelMode: google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
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
