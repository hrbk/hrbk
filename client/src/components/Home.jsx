import React from 'react';
import Search from './Search.jsx';
import View from './View.jsx';
import ListView from './ListView.jsx';
import Default from './DefaultList.jsx';

const Home = (props) => {
  var render;
  // if (props.filteredHomes.length) {
  render = <ListView close={props.close} profiles={props.filteredHomes} />
  // } else {
  // 	render = <Default close={props.close} sortedCities={props.sortedCities} />
  // }

  return (
    <div className="container">
      <Search {...props} onSearch={props.onSearch} />
      {render}
    </div>
  );
}

export default Home;
