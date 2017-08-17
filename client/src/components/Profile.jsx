import React from 'react'; 
import data from '../../../testdata.json'; 
import * as rb from 'react-bootstrap';

var title = {
  position: 'relative',
  background: `url(${data.profiles[1].photopath}) center center`, 
  height: '70vh',
  backgroundSize: 'cover',
  overflow: 'hidden'
}
var profilePhoto = {
  background: `url(${data.profiles[1].photopath}) no-repeat center`, 
  backgroundSize: '100% auto',
  height: '80vh'
}

class Profile extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      
    }
  }
  
  render() {
    return (
    <div>

      <rb.Jumbotron style={title}>
        
      </rb.Jumbotron>
    </div>
    )
  }
  
}

export default Profile;
