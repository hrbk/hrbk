import React from 'react';
import ReactDOM from 'react-dom';
import View from './View.jsx';
//import data from '../../../testdata.json';
//have a link to all the views url.. or something along those lines.
import Search from './Search.jsx';
import data from '../../../testdata.json';

const ListView = (props) => (
  /**
   * The ListView component maps through all filtered homes from a user's search into a list of div contained pieces of information. 
   */
const ListView = (props) => {
  
  return (
    <div>
      {props.profiles.map((home, i) => <View key={i} close={props.close} home={home}/>)}
    </div>
  )
};

export default ListView;
