import React from 'react';

const Home = (props) => (
  <div className="container">
    <h1>Home</h1>
    {props.homesList.map((home) => home)}
  </div>
);

export default Home;
