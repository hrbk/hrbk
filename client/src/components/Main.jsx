import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Dashboard from './Dashboard.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import ListView from './ListView.jsx';
import Profile from './Profile.jsx';

const Main = (props) => (
  <main>
    <Switch>
      <Route exact path='/' render={(args) => <Home {...args} onSearch={props.onSearch} sortedCities={props.sortedCities} filteredHomes={props.filteredHomes} />} />
      <Route path='/homes' render={(args) => <Home {...args} close={props.close} onSearch={props.onSearch} sortedCities={props.sortedCities} filteredHomes={props.filteredHomes} />} />
      <Route path='/homes=:profileId' component={Profile} />
      <Route path='/dashboard' component={(args) => <Profile {...args} isLoggedIn={props.isLoggedIn} userInfo={props.userInfo} />} />
      <Route path='/signup' render={(args) => <Signup {...args} isLoggedIn={props.isLoggedIn} userInfo={props.userInfo} handleInputChange={props.handleInputChange} onSignUpSubmit={props.onSignUpSubmit}/>}/>
      <Route path='/login' render={(args) => <Login {...args} isLoggedIn={props.isLoggedIn} userInfo={props.userInfo} handleInputChange={props.handleInputChange} onLoginSubmit={props.onLoginSubmit}/>}/>
    </Switch>
  </main>
)

export default Main;
