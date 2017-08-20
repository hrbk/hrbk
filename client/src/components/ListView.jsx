import React from 'react';
import ReactDOM from 'react-dom';
import View from './View.jsx';
//import data from '../../../testdata.json';
//have a link to all the views url.. or something along those lines.

const ListView = (props) => {
  
  return (
    <div>
      {props.profiles.map((home, i) => <View key={i} close={props.close} home={home}/>)}
    </div>
  )
};

export default ListView;
