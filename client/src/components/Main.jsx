import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Dashboard from './Dashboard.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import ListView from './ListView.jsx';
import View from './View.jsx';

const Main = (props) => (
  <main>
    <Switch>
      <Route exact path='/' render={() => <Home homesList={props.homesList} />}/>
      <Route path='/dashboard' component={Dashboard}/>
      <Route path='/signup' component={Signup}/>
      <Route path='/login' component={Login}/>
      <Route path='/listView' component={ListView}/>
      <Route path='/view' component={View}/>
    </Switch>
  </main>
)

export default Main;
