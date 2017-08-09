import React from 'react';
import ReactDOM from 'react-dom';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render () {
    return (
      <div>
        APP
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
