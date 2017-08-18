import React from 'react';
import * as rb from 'react-bootstrap';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit() {
    axios.post('/login', {email: this.state.email, password: this.state.password})
    .then((response) => {
      console.log('Success', response);
      window.history.pushState(null, null, 'dashboard');
    })
    .catch((error) => {
      console.log('Error on submission');
    })
  }

  render() {
    return (
      <div>
        <rb.Grid>
          <rb.Col md={4}>
            <rb.Form>
              <rb.FormGroup>
                <rb.ControlLabel>Username</rb.ControlLabel>
                <rb.FormControl 
                  type="text"
                  name="email" 
                  value={this.state.email} 
                  placeholder="Username" 
                  onChange={this.handleInputChange.bind(this)}>
                </rb.FormControl>
                <rb.ControlLabel>Password</rb.ControlLabel>
                <rb.FormControl
                  type="text"
                  name="password"
                  value={this.state.password}
                  placeholder="Password"
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
}

export default Login;
