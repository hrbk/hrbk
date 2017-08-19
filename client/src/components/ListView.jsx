import React from 'react';
import ReactDOM from 'react-dom';
import View from './View.jsx';
//import data from '../../../testdata.json';
//have a link to all the views url.. or something along those lines.

const ListView = (props) => (
  /**
   * The ListView component maps through all filtered homes from a user's search into a list of div contained pieces of information.
   */
    <div>
      {props.profiles.map((home, i) => <View key={i} home={home}/>)}
    </div>
);

export default ListView;
