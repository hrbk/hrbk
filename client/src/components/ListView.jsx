import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx';
import View from './View.jsx';
import Search from './Search.jsx';
import data from '../../../testdata.json';
//have a link to all the views url.. or something along those lines.

const ListView = (props) => (
  <div className="container">
    <div className="headerContainer"> 
    
    </div>
    <div className="homeContainer">
    <h1>Homes</h1>
      {
      /*console.log(data.profiles[1].description)*/
      data.profiles.map((home, i) => <View key={i} home={home}/>)
      /*props.homesList.map((home, i) => <View key={i} home={home}/>)*/
      } 
    </div>
  </div>
)

export default ListView;