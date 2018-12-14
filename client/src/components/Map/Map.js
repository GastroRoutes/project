
import ReactMapGL from 'react-map-gl';
import React, { Component } from 'react';

class Map extends Component {
constructor(){
super()

}

  state = {
    viewport: {
      width: 800,
      height: 400,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8
    }
  };

  render() {
    const TOKEN = ""
    return (
      <ReactMapGL mapboxApiAccessToken={TOKEN}
        {...this.state.viewport}
        onViewportChange={(viewport)  => this.setState({viewport})}
      />
    );
  }
}
export default Map
