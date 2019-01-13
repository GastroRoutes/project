import React, { Component } from 'react'
import axios from "axios";

export default class BurgerRanking extends Component {
    constructor(props){
super(props)
this.state = {
   burgerImage: "burgerImage"
}
this.service = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/tracks`,
    withCredentials: true
  });

    }
    sendRating = (rating, _id) => {
        return this.service
          .post(`/qualification`, { rating, _id })
          .then(response => {
            this.setState({...this.state, burgerImage: "burgerImageSelected"})
            this.props.getAllRoutes()
          })
          .catch(e => console.log(e.data));
      };
  render() {
    return (
      <div>
          <img onClick={()=>this.sendRating(this.props.index, this.props.element._id)} className={this.state.burgerImage} src="images/hamburger.png"/>
      </div>
    )
  }
}
