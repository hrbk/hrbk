import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx'
import View from './View.jsx';
//have a link to all the views url.. or something along those lines.

const ListView = (props) => (
  <div className="container">
    <div className="headerContainer"> 
      <Header /> 
      <Search /> 
    </div>
    <div className="homeContainer">
    <h1>Homes</h1>
      {props.homesList.map((home, i) => <View key={i} home={home}/>)} 
    </div>
  </div>
)

export default ListView;