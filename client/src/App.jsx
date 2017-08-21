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
      isLoggedIn: false,
      sortedCities: {}
    }

    this.onSearch = this.onSearch.bind(this);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
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

        });
        this.setState({sortedCities: sortedCities});
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


  onLoginSubmit() {
    axios.post('/login', {email: this.state.userInfo.email, password: this.state.userInfo.password})

    .then((response) => {
      console.log(response.data);
      this.setState({
        userInfo: {
          id: response.data.id,
          email: response.data.email,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          address: response.data.address,
          city: response.data.city,
          state: response.data.state,
          zipcode: response.data.zipcode,
          title: response.data.title,
          description: response.data.description,
        },
        isLoggedIn: true
      })
    })

    .catch((error) => {
      console.log('Error on submission');
    })
  }

  close() {
    this.setState( { open: !this.state.open } )
  }


  render () {
    return (
      <div>
        <Header />
        <Main filteredHomes={this.state.filteredHomes} userInfo={this.state.userInfo} isLoggedIn={this.state.isLoggedIn} handleInputChange={this.handleInputChange} onSearch={this.onSearch} onSignUpSubmit= {this.onSignUpSubmit} onLoginSubmit={this.onLoginSubmit} />
      </div>
    );
  }
}

export default App;
