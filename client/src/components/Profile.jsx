import React from 'react'; 
import data from '../../../testdata.json'; 
import * as rb from 'react-bootstrap';

class Profile extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }
  render() {
    return (
    <div>
      <rb.Jumbotron 
        style={profilephoto}>
      </rb.Jumbotron>
      <rb.Media style={profilehead}>
        <rb.Media.Body>
          <rb.Media.Heading style={heading}>
            {`${data.profiles[1].title}`}
          </rb.Media.Heading>
          <p style={location}>
            {`${data.profiles[1].city}`}, {`${data.profiles[1].state}`}
          </p>
        </rb.Media.Body>
        <rb.Media.Right>
          <rb.Thumbnail style={thumb}>
            <rb.Image style={userphoto} src={`${data.users[0].userphoto}`} circle />
            <div style={caption} className='caption'>{`${data.users[0].firstname}`} {`${data.users[0].lastname}`}</div>
            <rb.Button bsStyle='primary' block>
              Contact
            </rb.Button>
          </rb.Thumbnail>
        </rb.Media.Right>
      </rb.Media>
      <div style={descheading}>
        About this Listing
      <p style={description}>
        {`${data.profiles[1].description}`}
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
  background: `url(${data.profiles[1].photopath}) center center`, 
  height: '70vh',
  backgroundSize: 'cover',
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
