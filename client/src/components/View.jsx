import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Media, Grid, Row, Col, Label, Panel, Navbar, Thumbnail, Image, Button, Collapse, Well } from 'react-bootstrap';
import data from '../../../testdata.json';



const View = (props) => {

  return (
    <div className="home">
      <br/>
      <Link to={`/homes=${props.home.id}`}>
        <h5 className="homeName"> Home: {props.home.title} </h5>
      </Link>
  
      <div className="photo"> 
        <img src={ `${props.home.photopath}`} /> 
      </div>
       
      <Media>
          <Media.Left>
              <Navbar style={location}>
                <div className="location"> 
                  <Grid>
                    <Row className="address"> 
                      {props.home.address} 
                    </Row>
                    <Row className="city">
                      <Label> 
                        {props.home.city + ', '} 
                        {props.home.state + '. '}
                      </Label>
                    </Row>
                    <Row className="zip"> 
                      {' ' + props.home.zipcode} 
                    </Row>
                  </Grid>
                </div>
              </Navbar>
  
              <User />
  
          </Media.Left>
            <Media.Body style={description}>
              <Media.Heading style={head}>
                <p>
                  Description
                </p>
              </Media.Heading>
              <div>
                {props.home.description}
              </div>
              
            </Media.Body>
      </Media>
      <br/>
      <br/>
    </div>
  ) 
  
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
      hello
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
var thumb = {
  border: 'none'
}
var user = {
  height: '65px',
  width: 'auto',
  border: '1px solid #ccc'

}

export default View;


