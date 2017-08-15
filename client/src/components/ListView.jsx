import React from 'react';
import ReactDOM from 'react-dom';
import View;

//have a link to all the views url.. or something along those lines.

const ListView = (props) => (
  <div> </Header> </div>
  <div> </Search> </div>
  <div className="container">
  <h1>Homes</h1>
    {props.homesList.map((home, i) => <View key={i} home={home}/>)} 
  </div>
)

export default ListView;