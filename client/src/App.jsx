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
      userInfo: {
        id: '',
        email: '',
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
      isLoggedIn: false,
      sortedCities: {}
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


  onSignUpSubmit(images) {
      axios.post('/signup', {email: this.state.userInfo.email, firstname: this.state.userInfo.firstname, lastname: this.state.userInfo.lastname, password: this.state.userInfo.password, address: this.state.userInfo.address, city: this.state.userInfo.city, state: this.state.userInfo.state, zipcode: parseInt(this.state.userInfo.zipcode), title: this.state.userInfo.title, description: this.state.userInfo.description, photopath: this.state.userInfo.photopath})

      .then((response) => {
        debugger;
        this.setState({
          userInfo: {
            id: response.data.id,
            email: response.data.email,
            userphoto: `uploads/${images.profileImg.file.name}`,
            firstname: response.data.firstname,
            lastname: response.data.lastname,
            address: response.data.address,
            city: response.data.city,
            state: response.data.state,
            zipcode: response.data.zipcode,
            title: response.data.title,
            description: response.data.description,
            photopath: `uploads/${images.homeImg.file.name}`
          },
          isLoggedIn: true
        })
        // upload profile image
        this.userPhotoSubmit(images.profileImg);
        // upload home images
        this.homePhotoSubmit(images.homeImg, response.data.id);
      })

      .catch((error) => {
        console.log('ERROR POSTING SIGNUP')
      });



  }

  userPhotoSubmit(image) {
    const imageData = new FormData();
    const file = image.file;
    imageData.append('file', file, file.name);

    axios.post('/upload', imageData, {
      headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `${file.type}`,
      }
    })
    .then((response) => {
      const filepath = `uploads/${response.data.filename}`;
      const userEmail = this.state.userInfo.email;

      axios.post('/updateUserProfile', {filepath, userEmail})
      .then((response) => {
        console.log('updated userProfile');
      })
      .catch((error) => {
        console.log(error);
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }

  homePhotoSubmit(image, userId) {
    const imageData = new FormData();
    const file = image.file;
    imageData.append('file', file, file.name);
    axios.post('/upload', imageData, {
      headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `${file.type}`,
      }
    })
    .then((response) => {
      const filepath = `uploads/${response.data.filename}`;
      axios.post('/updateListingImage', {filepath, userId})
      .then((response) => {
        console.log('updated profile');
      })
      .catch((error) => {
        console.log(error);
      });
    })
    .catch((error) => {
      console.log(error);
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
