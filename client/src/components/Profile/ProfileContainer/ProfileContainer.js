import React, { Component } from 'react'
import axios from "axios";
import YourRoutes from "../YourRoutes/YourRoutes"

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.service = axios.create({
      baseURL: "http://localhost:5000/editProfile",
      withCredentials: true
    });
    this.state = {
        user : this.props.user
    };
  }

  handleFormSubmit = e => {
    e.preventDefault();
    const { username, email,  } = this.state.user;
    this.updateProfile({ username, email })
  }

  handleChange = e => {
    const { name, value } = e.target;
    const user = {...this.state.user};
    // console.log(e.target.value)
    user[name] = value;

    this.setState({...this.state, user});
  };

  updateProfile = user => {
    return this.service.post("/details", user)
    .then(response =>
          console.log(response)
        
    );
  };
  render() {

    return (
      <div>
      <h2>Hola {this.state.user.username}</h2>
      <YourRoutes
          getRoute={this.props.getRoute}
          getRestaurant={this.props.getRestaurant}
          handleFormSubmit={this.handleFormSubmit}
          handleChange={this.handleChange}
        />
      <form onSubmit={e=> this.handleFormSubmit(e)}>
        <input type="text" name="username" value={this.state.user.username} onChange={e => this.handleChange(e)} />

        <input type="email" name="email" value={this.state.user.email} onChange={e => this.handleChange(e)} />

        <input type="text" name="createdAt" value={this.state.user.created_at} onChange={e => this.handleChange(e)} />

        {/* <input type="password" name="password" value= {this.state.user.password} onChange={e => this.handleChange(e)} /> */}

        {/* <input type="file" name="photo" value={this.state.user.created_at} onChange={e => this.handleChange(e)} /> */}

        <input type="submit" value="Update Profile"/>
      </form>
    </div>
  )
}
}  
