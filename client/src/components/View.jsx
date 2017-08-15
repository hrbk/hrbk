import React from 'react';
import ReactDOM from 'react-dom';

//have a link to all the views url.. or something along those lines.

const View = (props) => (
  <div className="home" onclick={}>
    <h3 className="homeName">{props.home.name}</h3>
    <div className="homePic"> {props.home.}</div>
    <div className="homeInfo"> 
      <span> {} </span><span>{}</span> 
    </div>
  </div>
)

export default View;