import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Navbar from './navbar';
import Home from 'pages/home';
import Portfolio from 'pages/portfolio';
import NotFound from 'pages/notFound';
import './index.css';

const withNavBar = (props, Component, color) => (
  <>
    <Navbar logoColor={color}/>
    <Component {...props}/>
  </>
);

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' render={props => withNavBar(props, Home)}/>
      <Route path='/home' render={() => <Redirect to='/'/>}/>
      <Route path='/projects' render={() => <Redirect to='/portfolio'/>}/>
      <Route path='/portfolio' render={props => withNavBar(props, Portfolio, 'var(--white)')}/>
      <Route render={props => withNavBar(props, NotFound)}/>
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(<App/>, document.getElementById('root'));
