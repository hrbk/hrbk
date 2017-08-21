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
      profileImg: {
        file: {}
      },
      homeImg: {
        file: {}
      }
    }

    this.onProfileUpload = this.onProfileUpload.bind(this)
    this.onHomeUpload = this.onHomeUpload.bind(this)
  }

  handleChange(propertyName, e) {
    this.props.handleInputChange(propertyName, e);
  }

  onSubmit() {
    const signup = this;
    const images = {
      profileImg: signup.state.profileImg,
      homeImg: signup.state.homeImg
    }
    this.props.onSignUpSubmit(images);
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
      marginBottom: '10px',
      padding: '5px 11px'
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
                  value={this.props.userInfo.email}
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
