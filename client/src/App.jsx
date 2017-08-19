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
      sortedCities: {}
    }

    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    axios.get('/cities')
      .then((response) => {
        var sortedCities = {};
        response.data.forEach(profile => {      
          if (!sortedCities[profile.city]) {
            sortedCities[profile.city] = [profile];
          } else {
            sortedCities[profile.city].push(profile);
          }

          this.setState({sortedCities: sortedCities});
        });
      })
      .catch((error) => {
        console.log('app mount error', error);
      });
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

  close() { 
    this.setState( { open: !this.state.open } )
  }


  render () {
    return (
      <div>
        <Header />
        <Main close={this.close.bind(this)} onSearch={this.onSearch} sortedCities={this.state.sortedCities} filteredHomes={this.state.filteredHomes} />
      </div>
    );
  }
}

export default App;
