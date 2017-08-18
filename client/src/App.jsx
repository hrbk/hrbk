import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      filteredHomes: [],
    }

    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(searchFilter) {
    axios.get('/search', {
      params: {
        data: searchFilter
      }
    })
    .then((response) => {
      this.setState({
        filteredHomes: response.data
      });
    })
    .catch((error) => {
      console.log('Error on Axios GET');
    })
  }

  render () {
    return (
      <div>
        <Header />
        <Main onSearch={this.onSearch} filteredHomes={this.state.filteredHomes} />
      </div>
    );
  }
}

export default App;
