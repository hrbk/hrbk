import React from 'react';
import ReactDOM from 'react-dom';
import * as rb from 'react-bootstrap';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import Search from './components/Search.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      filteredHomes: [],
    }
  }
  
  onSearch(searchFilter) {
    axios.get('/search') //{city: searchFilter[0], state: searchFilter[1]}
    .then(function(response) {
      this.setState({
        filteredHomes: response //where data is held in axios response??
      });
    })

    .catch(function(error) {
      console.log('Error on Axios GET');
    })
  }

  render () {
    return (
      <div>
        <Header />
        <Main filteredHomes={this.state.filteredHomes} />
        <Search ></Search>
      </div>
    );
  }
}

export default App;