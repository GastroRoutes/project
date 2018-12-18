import React, { Component } from 'react'

export default class noTinvitationRoutes extends Component {
    constructor(){
        super()
        this.state = {
          tracks: this.props.tracks
        }
    }

  render() {
    return (
      <div>
        <button onClick={e=>this.addRestaurantToRoutes(e)}></button>
      </div>
    )
  }
}
