import React from 'react';
import * as rb from 'react-bootstrap';
import axios from 'axios';
import ImageUpload from 'react-dropzone';

var spacing = {
  marginBottom: '10px'
}

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
      profileImg: {
        file: {}
      },
      homeImg: {
        file: {}
      }
    }

    this.onProfileUpload = this.onProfileUpload.bind(this)
    this.onHomeUpload = this.onHomeUpload.bind(this)
    this.onSignUpSubmit = this.onSignUpSubmit.bind(this);
  }

  handleInputChange(propertyName, e) {
    const userInfo = this.state.userInfo;
    userInfo[propertyName] = e.target.value;
    this.setState({
      userInfo: userInfo //reset state to the entire object again, instead of just changed prop
    })
  }


  handleChange(propertyName, e) {
    this.handleInputChange(propertyName, e);
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

  onSubmit() {
    const signup = this;
    const images = {
      profileImg: signup.state.profileImg,
      homeImg: signup.state.homeImg
    }
    this.onSignUpSubmit(images);
  }

  onProfileUpload(files) {
    const file = files[0];
    this.setState({
      profileImg: {
        file
      }
    });
  }

  onHomeUpload(files) {
    const data = new FormData();
    const file = files[0];
    this.setState({
      homeImg: {
        file
      }
    });
  }

  render() {
    const uploadStyles = {
      width: '100%',
      height: '34px',
      borderWidth: '2px',
      borderColor: '#ccc',
      borderStyle: 'dashed',
      borderSadius: '5px',
      marginBottom: '10px'
    }
    return (
      <div>
        <rb.Grid>
          <rb.Col md={8}>
            <h3>Let's Get You Started!</h3>
            <rb.Form>
              <rb.FormGroup>

                <rb.ControlLabel>Email</rb.ControlLabel>
                <rb.FormControl
                  style={spacing}
                  type="text"
                  name="email"
                  value={this.state.userInfo.email}
                  placeholder="Email"
                  maxLength={50}
                  onChange={this.handleChange.bind(this, 'email')}>
                </rb.FormControl>

                <rb.ControlLabel>Profile Picture</rb.ControlLabel>
                <ImageUpload
                  id="profilephoto"
                  onDrop={this.onProfileUpload}
                  style={uploadStyles}
                  accept="image/jpeg, image/png">
                  <div>Upload Image {this.state.profileImg.file.name}</div>
                </ImageUpload>
                <rb.FormControl
                  style={spacing}
                  type="text"
                  name="userphoto"
                  value={this.state.userphoto}
                  placeholder="Profile Picture"
                  maxLength={50}
                  onChange={this.handleChange.bind(this, 'userphoto')}>
                </rb.FormControl>

                <rb.ControlLabel>First Name</rb.ControlLabel>
                <rb.FormControl
                  style={spacing}
                  type="text"
                  name="firstname"
                  value={this.state.firstname}
                  placeholder="First Name"
                  maxLength={50}
                  onChange={this.handleChange.bind(this, 'firstname')}>
                </rb.FormControl>

                <rb.ControlLabel>Last Name</rb.ControlLabel>
                <rb.FormControl
                  style={spacing}
                  type="text"
                  name="lastname"
                  value={this.state.lastname}
                  placeholder="Last Name"
                  maxLength={50}
                  onChange={this.handleChange.bind(this, 'lastname')}>
                </rb.FormControl>

                <rb.ControlLabel>Password</rb.ControlLabel>
                <rb.FormControl
                  style={spacing}
                  type="text"
                  name="password"
                  value={this.state.password}
                  placeholder="Password"
                  maxLength={50}
                  onChange={this.handleChange.bind(this, 'password')}>
                </rb.FormControl>

                <rb.ControlLabel>Address</rb.ControlLabel>
                <rb.FormControl
                  style={spacing}
                  type="text"
                  name="address"
                  value={this.state.address}
                  placeholder="Address"
                  maxLength={100}
                  onChange={this.handleChange.bind(this, 'address')}>
                </rb.FormControl>

                <rb.ControlLabel>City</rb.ControlLabel>
                <rb.FormControl
                  style={spacing}
                  type="text"
                  name="city"
                  value={this.state.city}
                  placeholder="City"
                  maxLength={25}
                  onChange={this.handleChange.bind(this, 'city')}>
                </rb.FormControl>

                <rb.ControlLabel>State</rb.ControlLabel>
                <rb.FormControl
                  style={spacing}
                  type="text"
                  name="state"
                  value={this.state.state}
                  placeholder="State"
                  maxLength={10}
                  onChange={this.handleChange.bind(this, 'state')}>
                </rb.FormControl>

                <rb.ControlLabel>Zip Code</rb.ControlLabel>
                <rb.FormControl
                  style={spacing}
                  type="text"
                  name="zipcode"
                  value={this.state.zipcode}
                  placeholder="Zip Code"
                  onChange={this.handleChange.bind(this, 'zipcode')}>
                </rb.FormControl>

                <rb.ControlLabel>Home Title</rb.ControlLabel>
                <rb.FormControl
                  style={spacing}
                  type="text"
                  name="title"
                  value={this.state.title}
                  placeholder="Home Title"
                  maxLength={25}
                  onChange={this.handleChange.bind(this, 'title')}>
                </rb.FormControl>

                <rb.ControlLabel>Home Description</rb.ControlLabel>
                <rb.FormControl
                  style={spacing}
                  type="text"
                  name="description"
                  value={this.state.description}
                  placeholder="Home Description"
                  maxLength={50}
                  onChange={this.handleChange.bind(this, 'description')}>
                </rb.FormControl>

                <rb.ControlLabel>Home Photo</rb.ControlLabel>
                <ImageUpload
                  id="homephoto"
                  onDrop={this.onHomeUpload}
                  style={uploadStyles}
                  accept="image/jpeg, image/png">
                  <div>Upload Image {this.state.homeImg.file.name}</div>
                </ImageUpload>

                <rb.Button
                style={{marginTop: '15px'}}
                type="button"
                bsStyle="info"
                onClick={this.onSubmit.bind(this)}
                >Submit</rb.Button>
              </rb.FormGroup>
            </rb.Form>
          </rb.Col>
        </rb.Grid>
      </div>
    )
  }
};

export default Signup;
