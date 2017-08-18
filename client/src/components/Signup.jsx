import React from 'react';
import * as rb from 'react-bootstrap';
import axios from 'axios';

var spacing = {
  marginBottom: '10px'
}

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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

    }
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit() {
    // var allItemsFilled = true;
    // for (var key in this.state) {
    //   console.log(this.state[JSON.stringify(key)]);
    //   if (this.state.key.length === 0) {
    //     allItemsFilled = false;
    //   }
    // }

    // if (allItemsFilled) {
      axios.post('/signup', {email: this.state.email, userphoto: this.state.userphoto, firstname: this.state.firstname, lastname: this.state.lastname, password: this.state.password, address: this.state.address, city: this.state.city, state: this.state.state, zipcode: parseInt(this.state.zipcode), title: this.state.title, description: this.state.description, photopath: this.state.photopath})

      .then((response) => {
        console.log('Success');
      })

      .catch((error) => {
        console.log('ERROR POSTING SIGNUP')
      })
    // }
  }

  render() {
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
                  value={this.state.email} 
                  placeholder="Email"
                  maxLength={50}
                  onChange={this.handleInputChange.bind(this)}>
                </rb.FormControl>

                <rb.ControlLabel>Profile Picture</rb.ControlLabel>
                <rb.FormControl 
                  style={spacing}             
                  type="text" 
                  name="userphoto"  
                  value={this.state.userphoto} 
                  placeholder="Profile Picture" 
                  maxLength={50}
                  onChange={this.handleInputChange.bind(this)}>
                </rb.FormControl>
                
                <rb.ControlLabel>First Name</rb.ControlLabel>
                <rb.FormControl 
                  style={spacing}
                  type="text" 
                  name="firstname" 
                  value={this.state.firstname} 
                  placeholder="First Name" 
                  maxLength={50}
                  onChange={this.handleInputChange.bind(this)}>
                </rb.FormControl>

                <rb.ControlLabel>Last Name</rb.ControlLabel>
                <rb.FormControl 
                  style={spacing} 
                  type="text" 
                  name="lastname"
                  value={this.state.lastname} 
                  placeholder="Last Name" 
                  maxLength={50}
                  onChange={this.handleInputChange.bind(this)}>
                </rb.FormControl>

                <rb.ControlLabel>Password</rb.ControlLabel>
                <rb.FormControl
                  style={spacing} 
                  type="text"
                  name="password"
                  value={this.state.password}
                  placeholder="Password"
                  maxLength={50}
                  onChange={this.handleInputChange.bind(this)}>
                </rb.FormControl>

                <rb.ControlLabel>Address</rb.ControlLabel>
                <rb.FormControl 
                  style={spacing} 
                  type="text" 
                  name="address"
                  value={this.state.address} 
                  placeholder="Address" 
                  maxLength={100}
                  onChange={this.handleInputChange.bind(this)}>
                </rb.FormControl>

                <rb.ControlLabel>City</rb.ControlLabel>
                <rb.FormControl 
                  style={spacing} 
                  type="text" 
                  name="city"
                  value={this.state.city} 
                  placeholder="City"
                  maxLength={25}
                  onChange={this.handleInputChange.bind(this)}>
                </rb.FormControl>

                <rb.ControlLabel>State</rb.ControlLabel>
                <rb.FormControl 
                  style={spacing} 
                  type="text" 
                  name="state"
                  value={this.state.state} 
                  placeholder="State" 
                  maxLength={10}
                  onChange={this.handleInputChange.bind(this)}>
                </rb.FormControl>

                <rb.ControlLabel>Zip Code</rb.ControlLabel>
                <rb.FormControl 
                  style={spacing} 
                  type="text" 
                  name="zipcode"
                  value={this.state.zipcode} 
                  placeholder="Zip Code" 
                  onChange={this.handleInputChange.bind(this)}>
                </rb.FormControl>

                <rb.ControlLabel>Home Title</rb.ControlLabel>
                <rb.FormControl 
                  style={spacing} 
                  type="text" 
                  name="title"
                  value={this.state.title} 
                  placeholder="Home Title"
                  maxLength={25} 
                  onChange={this.handleInputChange.bind(this)}>
                </rb.FormControl>

                <rb.ControlLabel>Home Description</rb.ControlLabel>
                <rb.FormControl 
                  style={spacing} 
                  type="text" 
                  name="description"
                  value={this.state.description} 
                  placeholder="Home Description" 
                  maxLength={50}
                  onChange={this.handleInputChange.bind(this)}>
                </rb.FormControl>

                <rb.ControlLabel>Home Photo</rb.ControlLabel>
                <rb.FormControl 
                  style={spacing} 
                  type="text" 
                  name="photopath"
                  value={this.state.photopath} 
                  placeholder="Add a Home Photo" 
                  maxLength={50}
                  onChange={this.handleInputChange.bind(this)}>
                </rb.FormControl>

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
