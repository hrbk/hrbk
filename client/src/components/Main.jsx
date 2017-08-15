import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Dashboard from './Dashboard.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';

const Main = (props) => (
  <main>
    <Switch>
      <Route exact path='/' render={() => <Home homesList={props.homesList} />}/>
      <Route path='/dashboard' component={Dashboard}/>
      <Route path='/signup' component={Signup}/>
      <Route path='/login' component={Login}/>
    </Switch>
  </main>
)

export default Main;