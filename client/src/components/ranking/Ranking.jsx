import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom"

export default class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      everyUsers: null
    };


    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/ranking`,
      withCredentials: true
    });
    this.getRankingUsers();
    this.getrating()
  }
  getRankingUsers = () => {
    return this.service("/ranking").then(users =>
      this.setState({ ...this.state, everyUsers: users.data })
    );
  };
  getrating = () => {
    return this.service("/rating").then(users =>{

      return
    }
    ).catch(err=>console.log(err))
  };

  componentDidMount() {
    this.getRankingUsers();
    this.getrating()
  }
  render() {
    
    const ranking = this.state.everyUsers ? (
      this.state.everyUsers.map((user, index) => {
        console.log(this.state.everyUsers)
        const userRating = user.rating
        let fixedRating
        let separatedDecimalsArr
        let decimalsRating
        let integerRating
        if(userRating){
          fixedRating = userRating.toFixed(1)
          separatedDecimalsArr = fixedRating.toString().split(".")
          decimalsRating = separatedDecimalsArr[1]
          integerRating = separatedDecimalsArr[0]
        }
      return (
        <div className="user-ranking">
          <img src={user.imgPath}></img>
            <h2>{index+1}º. </h2>
            <h2>{user.username}.</h2>
            <h1 className="rating">{integerRating}<sup className="superindex">'{decimalsRating}</sup></h1>
            <Link to={`/usersRoutes/${user._id}`}><button className="btn-right">Todas las rutas</button></Link>
          </div>
        );
      })
    ) : (
      <div />
    );

    return <div className="yourRoutes-big-container user-ranking-container">
          <h1 className="ranking">Ranking</h1>
    {ranking}
    </div>
  }
}
