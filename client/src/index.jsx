import React from 'react';
import ReactDOM from 'react-dom';
import Search from './Search.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render () {
    return (
      <div>
        <Search></Search>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
