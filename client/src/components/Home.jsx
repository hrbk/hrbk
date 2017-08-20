import React from 'react';
import Search from './Search.jsx';
import View from './View.jsx';
import ListView from './ListView.jsx';

const Home = (props) => {
  return (
    <div className="container">
      <Search {...props} onSearch={props.onSearch} />
      <ListView profiles={props.filteredHomes} />
    </div>
  );
}

export default Home;
