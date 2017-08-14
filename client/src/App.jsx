import React from 'react';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homesList: [1, 2, 3]
    }
  }

  render () {
    return (
      <div>
        <Header />
        <Main homesList={this.state.homesList} />
      </div>
    );
  }
}

export default App;
