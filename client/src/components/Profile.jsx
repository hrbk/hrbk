import React from 'react';
import data from '../../../testdata.json';
import axios from 'axios';
import * as rb from 'react-bootstrap';


class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: data.profiles[1]
    }
  }
  componentDidMount() {
    const profileId = this.props.match.params.profileId;
    if (profileId) { //for entering specific profile of another user
      axios.get(`/search/${profileId}`)
      .then((response) => {
        this.setState({
          data: response.data[0]
        })
      })
      .catch((error) => {
        console.log('error', error);
      });
    } else { //in case of entering dashboard and entering user's own profile
      this.setState({
        data: this.props.userInfo
      })
    }
  }
  render() {
    const bgImage = Object.assign({}, profilephoto, {backgroundImage: `url(${this.state.data.photopath})`})
    return (
    <div>
      <rb.Jumbotron
        style={bgImage}>
      </rb.Jumbotron>
      <rb.Media style={profilehead}>
        <rb.Media.Body>
          <rb.Media.Heading style={heading}>
            {this.state.data.title}
          </rb.Media.Heading>
          <p style={location}>
            {this.state.data.city}, {this.state.data.state}
          </p>
        </rb.Media.Body>
        <rb.Media.Right>
          <rb.Thumbnail style={thumb}>
            <rb.Image style={userphoto} src={data.users[0].userphoto} circle />
            <div style={caption} className='caption'>{data.users[0].firstname} {data.users[0].lastname}</div>
            <rb.Button bsStyle='primary' block>
              Contact
            </rb.Button>
          </rb.Thumbnail>
        </rb.Media.Right>
      </rb.Media>
      <div style={descheading}>
        About this Listing
      <p style={description}>
        {this.state.data.description}
      </p>
      </div>
    </div>
    )
  }
}

//styles
var profilephoto = {
  marginTop: '-20px',
  position: 'relative',
  height: '70vh',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  overflow: 'hidden'
}
var profilehead = {
  margin: '0 auto',
  width: '60%',
  borderBottom: '1px solid #ccc'
}
var heading = {
  fontSize: '36px'
}
var location = {
  fontSize: '20px',
  color: '#767676',
  fontWeight: '200'
}
var userphoto = {
  overflow: 'hidden',
  height: '65px',
  width: 'auto',
  border: '1px solid #ccc',
}
var thumb = {
  border: 'none'
}
var caption = {
  fontSize: '15px',
  textAlign: 'center',
  paddingBottom: '0',
  marginBottom: '5px'
}
var descheading = {
  fontSize: '28px',
  margin: '0 auto',
  width: '60%',
  padding: '10px 0',
  fontWeight: '400'
}
var description = {
  fontSize: '16px',
  fontWeight: '200',
  padding: '20px 0'
}
export default Profile;
