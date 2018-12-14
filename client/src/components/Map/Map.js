import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
import React, { Component } from 'react'


const Map = ReactMapboxGl({
  accessToken:
"pk.eyJ1IjoiZGRpZXpyIiwiYSI6ImNqb3ZuMGZ3cjFqa2YzcWxrYjBtNjJzaG4ifQ.cCFZkl39Hov3D-Ujeq74Cg"
});
const Zoom = [10];
const mapStyle = { height: "100vh", width: "100vw", display: "flex" };
const styles = { dark: "mapbox://styles/mapbox/light-v9" };
const center = [-3.70379, 40.416775];


export default class MapBox extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  //Component didmount: establecer la peticion get de axios a mapbox api documentation
 
  render() {
<<<<<<< HEAD
    const TOKEN = "pk.eyJ1Ijoiam9yZ2VkZXZlc2EiLCJhIjoiY2pwbjU2NjBjMGZlZzQ5cnRkbHViNXd0OSJ9.6d4S51WJKkxfVJ8rEOKvBw"
    return (
      <ReactMapGL mapboxApiAccessToken={TOKEN}
        {...this.state.viewport}
        onViewportChange={(viewport)  => this.setState({viewport})}
      />
    );
=======
      return (
        <Map
          style={styles.dark}
          zoom={Zoom}
          containerStyle={mapStyle}
          center={center}
        >
            <Layer
              type="symbol"
              id="marker"
              layout={{ "icon-image": "marker-15","icon-size":1.25 }}>
              <Feature coordinates={[-3.70379, 40.416775]}/>
            </Layer>
            <Layer
              type="symbol"
              id="marker2"
              layout={{ "icon-image": "marker-15","icon-size":1.25 }}>
              <Feature coordinates={[-3.698237699999936, 40.3932277]}/>
            </Layer>
        </Map>
      );
    }
>>>>>>> 8140fb6baff808912dc434961d1b29c5c5a2016e
  }

  