import React, { Component } from 'react'

export default class noTinvitationRoutes extends Component {
    constructor(){
        super()
        this.state = {
            allRoutes: this.props.allRoutes
        }
    }
    addRestaurantToRoutes = restaurant => {
        console.log(restaurant)
        const user = this.state.user
        const route = this.state.route
        this.services.post("create", {user, route})
      }

  render() {
    return (
      <div>
        <button onClick={e=>this.addRestaurantToRoutes(e)}></button>
      </div>
    )
  }
}
