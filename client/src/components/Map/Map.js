
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
    const TOKEN = "pk.eyJ1Ijoiam9yZ2VkZXZlc2EiLCJhIjoiY2pwbjU2NjBjMGZlZzQ5cnRkbHViNXd0OSJ9.6d4S51WJKkxfVJ8rEOKvBw"
    return (
      <ReactMapGL mapboxApiAccessToken={TOKEN}
        {...this.state.viewport}
        onViewportChange={(viewport)  => this.setState({viewport})}
      />
    );
  }
}
export default Map
