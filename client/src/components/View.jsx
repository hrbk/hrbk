import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Glyphicon, Media, Grid, Row, Col, Label, Panel, Navbar, Thumbnail, Image, Button, Collapse, Well } from 'react-bootstrap';
import data from '../../../testdata.json';
// nimport {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


const View = (props) => {
  var onHover = false;
  const glyphStyle = {
    background: '#eee',
    borderColor: '#f2f2f2',
    borderTopLeftRadius: '0px',
    borderBottomLeftRadius: '0px'
  }
  const thumbnailStyle = {
    padding: '0',
    margin: '10px 0'
  }
  const learnMoreBtn = {
    margin: '10px 0',
    display: 'inline-block',
    borderTopRightRadius: '0',
    borderBottomRightRadius: '0'
  }
  const linkStyle = {
    color: '#333'
  }
  const avatarStyle = {
    float: 'right',
    width: '60px'
  }
  const captionStyle = {
    padding: '15px'
  }
  const headerStyle = {
    marginTop: '0'
  }
  return (
      <Col xs={12} md={6}>
        <Thumbnail style={thumbnailStyle} src={`${props.home.photopath}`} alt="homephoto">
          <div style={captionStyle}>
            <Image style={avatarStyle} src="https://media.licdn.com/mpr/mpr/shrinknp_100_100/AAEAAQAAAAAAAAgxAAAAJDg3N2UwOTkzLWM4MDAtNDQ3Yi04YjNjLWVmODQwYmM1NmUwZg.jpg" circle />
            <Link style={linkStyle} to={`/homes=${props.home.id}`}>
                <h3 style={headerStyle}>{props.home.title}</h3>
            </Link>
            <p>
              {props.home.city}, {props.home.state}
            </p>
            <Link style={linkStyle} to={`/homes=${props.home.id}`}>
              <Button style={learnMoreBtn} type="button" bsStyle="info">Learn More</Button>
            </Link>
            <Button style={glyphStyle} onClick={() => console.log('in')} bsStyle="primary">
              <Glyphicon glyph="glyphicon glyphicon-heart" />
            </Button>
          </div>
        </Thumbnail>
      </Col>
  );
  // <div className="home">
  //   <br/>
  //   <Link to={`/homes=${props.home.id}`}>
  //     <h5 className="homeName"> Home: {props.home.title} </h5>
  //   </Link>
  //
  //   <div className="photo">
  //     <img src={ `${props.home.photopath}`} />
  //   </div>
  //
  //   <Media>
  //       <Media.Left>
  //           <Navbar style={location}>
  //             <div className="location">
  //               <Grid>
  //                 <Row className="address">
  //                   {props.home.address}
  //                 </Row>
  //                 <Row className="city">
  //                   <Label>
  //                     {props.home.city + ', '}
  //                     {props.home.state + '. '}
  //                   </Label>
  //                 </Row>
  //                 <Row className="zip">
  //                   {' ' + props.home.zipcode}
  //                 </Row>
  //               </Grid>
  //             </div>
  //           </Navbar>
  //
  //           <User />
  //
  //       </Media.Left>
  //         <Media.Body style={description}>
  //           <Media.Heading style={head}>
  //             <p>
  //               Description
  //             </p>
  //           </Media.Heading>
  //           <div>
  //             {props.home.description}
  //           </div>
  //
  //         </Media.Body>
  //   </Media>
  //   <br/>
  //   <br/>
  // </div>

};



const User = (props) => {
  return (
    <div>
        <Thumbnail style={thumb}>
          <Image style={user} src={data.users[0].userphoto} circle/>
        </Thumbnail>
      <Name />
    </div>
  )
}

const Name = () => {
  return (
    <div>

      <button disabled>
      User
      </button>
    </div>
  )
}

var location = {
  maxWidth: '150px',
  float: 'left',
  color: 'grey',
  font: 'helvetica'
}
var description = {
  'maxWidth': '400px',

}
var head = {

}
var name={
  'background': 'yellow'
}
var thumb = {
  border: 'none'
}
var user = {
  height: '65px',
  width: 'auto',
  border: '1px solid #ccc'

}

export default View;
