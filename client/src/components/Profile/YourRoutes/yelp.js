import React, { Component } from "react";

class InputYelp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: {
        term: "",
        location: ""
      },
      preload: false,
      inputClassTerm: null,
      inputClassLocation: null

    };
  }
  handleFormSubmit = e => {
    e.preventDefault();
    

    const { term, location } = this.state.restaurant;
    if (term === "") {
      this.setState({ ...this.state, inputClassTerm: "inputError", inputClassLocation: null});
    }
    else{
      if (location === "") {
        this.setState({ ...this.state, inputClassLocation: "inputError", inputClassTerm: null });      
      } 
      else {
       if(term !== "" && location !== ""){
         this.props.getRestaurants({ term, location }).then(restaurant => {
           this.props.sendRestaurants(restaurant);
           this.setState({
             ...this.state,
             errorTerm: false,
             errorLocation: false
           });
           // this.props.getRestaurant(restaurant.name) /// hay que tratarlo. Llega como array
         });
       }
     }
    }
  };

  handleChange = e => {
    const { name, value } = e.target;

    let searchRestaurant = this.state.restaurant;
    searchRestaurant[name] = value;
    this.setState({
      ...this.state,
      restaurant: searchRestaurant
    });
  };

  render() {

    return (
      <div>
        <form
          className="center-form-yelp"
          onSubmit={e => this.handleFormSubmit(e, this.props.state)}
        >
         <input
        className={this.state.inputClassTerm}
        type="text"
        name="term"
        placeholder="Buscar restaurantes"
        onChange={e => this.handleChange(e)}
        autoComplete="off"
      />
            <input
        className={this.state.inputClassLocation}
        type="text"
        name="location"
        placeholder="Ubicación"
        onChange={e => this.handleChange(e)}
        autoComplete="off"
      />

          <input value="Buscar restaurantes" type="submit" />
          {/* <input type="text" name="location" onChange={e => this.handleChange(e)} /> */}
        </form>
      </div>
    );
  }
}

export default InputYelp;
