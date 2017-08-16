import React from 'react';
import ReactDOM from 'react-dom';

//have a link to all the views url.. or something along those lines.
/*IMPORTANT: 
  -photopath is not registered with dummydata;
*/

const View = (props) => (
  <div className="home">
    <h5 className="homeName"> Home: {props.home.title} </h5>
    <div> <img src={ `${props.home.photopath}`} /> </div>
    <div className="homeInfo"> 
      <span className="address"> {props.home.address} </span>
      <br/>
      <span className="city"> {props.home.city + ', '} </span> 
      <span className="state"> {props.home.state + '. '} </span> 
      <span className="zip"> {' ' + props.home.zipcode} </span>
     
      <br/>
      <span> Desciption: {props.home.description + '. \n'} </span>
      <br/>

    </div>
  </div>
);

export default View;