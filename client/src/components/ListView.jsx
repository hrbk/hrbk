import React from 'react';
import ReactDOM from 'react-dom';
import View from './View.jsx';
//import data from '../../../testdata.json';
//have a link to all the views url.. or something along those lines.

const ListView = (props) => {
  const welcomeStyle = {
    background: 'linear-gradient(141deg, #0fb8ad 0%, #1fc8db 51%, #2cb5e8 75%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '260px',
    color: '#fff'
  }
  var Lister;
  if (props.profiles.length > 0) {
    Lister = (props.profiles.map((home, i) => <View key={i} close={props.close} home={home}/>));
  } else {
    Lister = (
      <div>
        <div style={welcomeStyle}><h1>Where are you looking to swap?</h1></div>
        <h3>About Home/Swap</h3>
        <p>Home/Swap is the best way to travel without spending a dime on housing. Users can go exchange their homes for a pre-specified period of time if they have a mutual interest in traveling to the cities they live in.

          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem IpsumLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing</p>
        <p>Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem IpsumLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem IpsumLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
      </div>
    );
  }
  return (
    <div>
      {Lister}
    </div>
  )
};

export default ListView;
