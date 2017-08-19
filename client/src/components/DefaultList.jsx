import React from 'react';
import { Media, Label } from 'react-bootstrap';
import View from './View.jsx'

const DefaultList = (props) => {

  return (
    <div className="container">
      <br/>
      <Media.Left align="middle">
        <Media.Heading>
          <h2> <Label class="head">Try </Label> </h2>
          	
        </Media.Heading>
      </Media.Left>
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

    </div>
  );
}

const City = (props) => {

  return (
    <Media.Heading>
      <Label>
      {props.city + '!'}
      </Label>
      <br/>
    </Media.Heading>
  );
}

export default DefaultList;