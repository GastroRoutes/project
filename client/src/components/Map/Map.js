import React from "react"
import { compose, withStateHandlers } from "recompose"
import {  withScriptjs,  withGoogleMap, GoogleMap,Marker,
  InfoWindow, } from "react-google-maps"
import FaAnchor from './Map';
import axios from "axios"

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
        <Marker
      position={{ lat: 40.4146500, lng: -3.7004000 }}
    />
      {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
        <FaAnchor />
      </InfoWindow>}
    </Marker>
  </GoogleMap>
);


class MyFancyComponent extends React.PureComponent {
constructor(){
  super()

  this.service = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true
  });

this.getDirections()
}

getDirections= (origin, destination) => {
  return this.service.post("/mapDirections", {origin, destination})
  .then(response =>
      {
      return response.data.map((e)=>{
      return {e} 
         })
  });
};


  // state = {
  //   isMarkerShown: false,
  // }

  // componentDidMount() {
  //   this.delayedShowMarker()
  // }

  // delayedShowMarker = () => {
  //   setTimeout(() => {
  //     this.setState({ isMarkerShown: true })
  //   }, 6000)
  // }

  // handleMarkerClick = () => {
  //   this.setState({ isMarkerShown: false })
  //   this.delayedShowMarker()
  // }

  render() {
    
    return (

      <MapWithAMakredInfoWindow
  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB8NzS5RBf23YH2cAwWi8t0HlpwPfqB6no&v=3.exp&libraries=geometry,drawing,places"
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `400px` }} />}
  mapElement={<div style={{ height: `100%` }} />}
/>
    )
  }
}

export default MyFancyComponent;
