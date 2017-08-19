import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx';
import View from './View.jsx';
import Search from './Search.jsx';
import data from '../../../testdata.json';

const ListView = (props) => (
  /**
   * The ListView component maps through all filtered homes from a user's search into a list of div contained pieces of information. 
   */
    <div>
      {props.profiles.map((home, i) => <View key={i} home={home}/>)}
    </div>
);

export default ListView;
