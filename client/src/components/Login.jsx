import React from 'react';
import * as rb from 'react-bootstrap';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  handleChange(propertyName, e) {
    this.props.handleInputChange(propertyName, e);
  }

  onSubmit() {
    var context = this;
    this.props.onLoginSubmit(function() {
      if (context.props.isLoggedIn) {
        context.props.history.push('/');
      } else {
        context.props.history.push('/login');
      }
    });
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
                  onChange={this.props.handleInputChange.bind(this, 'email')}>
                </rb.FormControl>
                <rb.ControlLabel>Password</rb.ControlLabel>
                <rb.FormControl
                  type="password"
                  name="password"
                  value={this.state.password}
                  placeholder="Password"
                  onChange={this.props.handleInputChange.bind(this, 'password')}>
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
