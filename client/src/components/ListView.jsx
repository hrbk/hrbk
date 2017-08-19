import React from 'react';
import ReactDOM from 'react-dom';
import View from './View.jsx';
<<<<<<< HEAD
//import data from '../../../testdata.json';
//have a link to all the views url.. or something along those lines.
=======
import Search from './Search.jsx';
import data from '../../../testdata.json';
>>>>>>> add documentation for ListView

const ListView = (props) => (
  /**
   * The ListView component maps through all filtered homes from a user's search into a list of div contained pieces of information. 
   */
    <div>
      {props.profiles.map((home, i) => <View key={i} home={home}/>)}
    </div>
);

export default ListView;
