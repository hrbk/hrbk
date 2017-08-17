import React from 'react';
import Search from './Search.jsx';

const Home = (props) => (
  <div className="container">
    <h1>Home</h1>
    <Search onSearch={props.onSearch} />
  </div>
);

export default Home;
