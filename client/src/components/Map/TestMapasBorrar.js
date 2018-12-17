/* eslint-disable no-undef */
/*global google */
import { compose, withProps, withStateHandlers } from "recompose";
import { FaAnchor } from "react-icons/fa";
import { withScriptjs,  withGoogleMap,  GoogleMap,  Marker,  InfoWindow,} from "react-google-maps";
import React, { Component}  from 'react';

const MapWithAMakredInfoWindow = compose(
  withStateHandlers(() => ({
    isOpen: false,
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    })
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    <Marker
      position={{ lat: -34.397, lng: 150.644 }}
      onClick={props.onToggleOpen}
    >
      {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
        <FaAnchor />
      </InfoWindow>}
    </Marker>
  </GoogleMap>
);


export default class TestMapasBorrar extends Component {
  
  render() {

    return (
      <div>
        <MapWithAMakredInfoWindow
  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB8NzS5RBf23YH2cAwWi8t0HlpwPfqB6no&v=3.exp&libraries=geometry,drawing,places"
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `400px` }} />}
  mapElement={<div style={{ height: `100%` }} />}
/>

      </div>
    );
  }
}