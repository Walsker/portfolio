import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Navbar from './navbar';
import Home from 'pages/home';
import Projects from 'pages/projects';
import NotFound from 'pages/notFound';
import './index.css';

const withNavBar = (Component, props, flipColor) => (
  <>
    <Navbar flipColor={flipColor}/>
    <Component {...props}/>
  </>
);

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' render={props => withNavBar(Home, props)}/>
      <Route path='/home' render={() => <Redirect to='/'/>}/>
      <Route path='/projects' render={props => withNavBar(Projects, props, true)}/>
      <Route render={props => withNavBar(NotFound, props)}/>
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(<App/>, document.getElementById('root'));
