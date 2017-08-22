import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import axios from 'axios';
import request from 'superagent';
const CLOUDINARY_UPLOAD_PRESET = 'ohicg81w';
const CLOUDINARY_UPLOAD_URL = '	https://api.cloudinary.com/v1_1/homeswapimages/upload';

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
      isLoggedIn: false,
      sortedCities: {}
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onSignUpSubmit = this.onSignUpSubmit.bind(this);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.onLogOut = this.onLogOut.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.homePhotoSubmit = this.homePhotoSubmit.bind(this)
  }

  handleImageUpload(file) {
   let upload = request.post(CLOUDINARY_UPLOAD_URL)
                       .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                       .field('file', file);

   upload.end((err, response) => {
     if (err) {
       console.error(err);
     }

     if (response.body.secure_url !== '') {
       const filepath = response.body.secure_url;
       const userEmail = this.state.userInfo.email;
       const userInfo = this.state.userInfo;
       userInfo.userphoto = filepath;
       this.setState({
         userInfo
       });
       axios.post('/updateUserProfile', {filepath, userEmail})
         .then((response) => {
           console.log('updated userProfile');
         })
         .catch((error) => {
           console.log(error);
       });
     }
   });
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
      console.log(response.data);
      this.setState({
        filteredHomes: response.data
      });
    })
    .catch((error) => {
      console.log('Error on Axios GET');
    })
  }


  onSignUpSubmit(images, cb) {
      axios.post('/signup', {email: this.state.userInfo.email, firstname: this.state.userInfo.firstname, lastname: this.state.userInfo.lastname, password: this.state.userInfo.password, address: this.state.userInfo.address, city: this.state.userInfo.city, state: this.state.userInfo.state, zipcode: parseInt(this.state.userInfo.zipcode), title: this.state.userInfo.title, description: this.state.userInfo.description, photopath: this.state.userInfo.photopath})

      .then((response) => {
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
        this.handleImageUpload(images.profileImg.file);
        // upload home images
        this.homePhotoSubmit(images.homeImg.file, response.data.id);
        cb();
      })

      .catch((error) => {
        cb();
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

  homePhotoSubmit(file, userId) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        const filepath = response.body.secure_url;
        const userInfo = this.state.userInfo;
        userInfo.photopath = filepath;
        this.setState({
          userInfo
        });
        axios.post('/updateListingImage', {filepath, userId})
          .then((response) => {
            console.log('updated profile');
          })
          .catch((error) => {
            console.log(error);
        });
      }
    });

  }

  onLoginSubmit(cb) {
    axios.post('/login', {email: this.state.userInfo.email, password: this.state.userInfo.password})

    .then((response) => {
      this.setState({
        userInfo: {
          id: response.data.id,
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
          photopath: response.data.photopath

        },
        isLoggedIn: true
      })
      cb();
    })

    .catch((error) => {
      console.log('Error on submission');
      cb();
    })
  }

  close() {
    this.setState( { open: !this.state.open } )
  }

  onLogOut() {
    this.setState({
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
      isLoggedIn: false,
      sortedCities: {}
    })
  }


  render () {
    return (
      <div>
        <Header isLoggedIn={this.state.isLoggedIn} onLogOut={this.onLogOut}/>
        <Main filteredHomes={this.state.filteredHomes} userInfo={this.state.userInfo} isLoggedIn={this.state.isLoggedIn} handleInputChange={this.handleInputChange} onSearch={this.onSearch} onSignUpSubmit= {this.onSignUpSubmit} onLoginSubmit={this.onLoginSubmit} />
      </div>
    );
  }
}

export default App;
