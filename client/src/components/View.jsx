import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Media, Grid, Row, Col, Label, Panel, Navbar } from 'react-bootstrap';

const View = (props) => (
  <div className="home">

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
        </Media.Left>

          <Media.Body style={description}>
            <Media.Heading style={head}>
              <p className="Description">
                Description
              </p>
            </Media.Heading>
            
            {props.home.description}
          </Media.Body>
    

    </Media>

  </div>
);

var location = {
  maxWidth: '150px',
  float: 'left',
  color: 'grey',
  font: 'helvetica'
}
var description = {
  'maxWidth': '450px',
  
}
var head = {

}

export default View;


