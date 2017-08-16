import React from 'react';
import ReactDOM from 'react-dom';

//have a link to all the views url.. or something along those lines.
/*IMPORTANT: 
  -photopath is not registered with dummydata;
*/

const View = (props) => (
  <div className="home">
    <h3 className="homeName"> {props.home.name} </h3>
    <div className="homePic"> {props.home.photopath} </div>
    <div className="homeInfo"> 
      <span> Bedrooms: {props.home.bedrooms + '. '} </span>
      <span> Bathrooms: {props.home.bathrooms + '. '} </span> 
      <span> PRICE: {props.home.price + '. '} </span>
      <span onCLick={}> LINK: {props.home.listing_url} </span>
    </div>
  </div>
)

export default View;