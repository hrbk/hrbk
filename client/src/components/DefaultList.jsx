import React from 'react';
import { Media } from 'react-bootstrap';
import View from './View.jsx'

const DefaultList = (props) => {

  return (
    <div className="container">
      <br/>
      <Media.Left align="middle">
        <Media.Heading>
          <span class="head">Try: </span>
          <br/>

          {Object.keys(props.sortedCities).map((city, i) => 
          	<div>
          	  <div>
              <City key={i} city={city} property={props.sortedCities[city]}/>
              </div>
              <div>
              <View key={i} home={props.sortedCities[city][0]} />
              </div>
            </div> 
          )}
          	
        </Media.Heading>
      </Media.Left>


    </div>
  );
}

const City = (props) => {

  return (
    <div className="container">
      {props.city + '!'}
      {console.log(props.property)}
      <br/>
    </div>
  );
}

export default DefaultList;