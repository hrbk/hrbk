import React from 'react';
import ReactDOM from 'react-dom';
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
      userInfo: {
        id: '',
        email: '',
        userphoto: '',
        firstname: '',
        lastname: '',
        password: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
        title: '',
        description: '',
        photopath: ''
      },
      isLoggedIn: false
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onSignUpSubmit = this.onSignUpSubmit.bind(this);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
  }

  handleInputChange(propertyName, e) {
    const userInfo = this.state.userInfo;
    userInfo[propertyName] = e.target.value;
    this.setState({
      userInfo: userInfo //reset state to the entire object again, instead of just changed prop
    })
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

  onSignUpSubmit() {
    // var allItemsFilled = true;
    // for (var key in this.state) {
    //   console.log(this.state[JSON.stringify(key)]);
    //   if (this.state.key.length === 0) {
    //     allItemsFilled = false;
    //   }
    // }
    // if (allItemsFilled) {
      axios.post('/signup', {email: this.state.userInfo.email, userphoto: this.state.userInfo.userphoto, firstname: this.state.userInfo.firstname, lastname: this.state.userInfo.lastname, password: this.state.userInfo.password, address: this.state.userInfo.address, city: this.state.userInfo.city, state: this.state.userInfo.state, zipcode: parseInt(this.state.userInfo.zipcode), title: this.state.userInfo.title, description: this.state.userInfo.description, photopath: this.state.userInfo.photopath})
      
      .then((response) => {
        this.setState({
          userInfo: {
            id: response.data.userid,
            email: response.data.email,
            userphoto: response.data.userphoto,
            firstname: response.data.firstname,
            lastname: response.data.lastname,
            address: response.data.address,
            city: response.data.city,
            state: response.data.state,
            zipcode: response.data.zipcode,
            title: response.data.title,
            description: response.data.description,
            photopath: response.data.photopath,
          },
          isLoggedIn: true
        })
      })

      .catch((error) => {
        console.log('ERROR POSTING SIGNUP')
      })
    // }
  }

  onLoginSubmit() {
    axios.post('/login', {email: this.state.userInfo.email, password: this.state.userInfo.password})
    
    .then((response) => {
      console.log(response.data);
      this.setState({
        userInfo: {
          id: response.data.userid,
          email: response.data.email,
          userphoto: response.data.userphoto,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          address: response.data.address,
          city: response.data.city,
          state: response.data.state,
          zipcode: response.data.zipcode,
          title: response.data.title,
          description: response.data.description,
          photopath: response.data.photopath,
        },
        isLoggedIn: true
      })
    })

    .catch((error) => {
      console.log('Error on submission');
    })
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

