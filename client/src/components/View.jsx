import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

const View = (props) => (
  <div className="home">
    <Link to={`/homes=${props.home.id}`}>
      <h5 className="homeName"> Home: {props.home.title} </h5>
    </Link>
    <div> <img src={ `${props.home.photopath}`} /> </div>
    <div className="homeInfo">
      <span className="address"> {props.home.address} </span>
      <br/>
      <span className="city"> {props.home.city + ', '} </span>
      <span className="state"> {props.home.state + '. '} </span>
      <span className="zip"> {' ' + props.home.zipcode} </span>

      <br/>
      <span> Description: {props.home.description + '.'} </span>
      <br/>

    </div>
  </div>
);

export default View;
