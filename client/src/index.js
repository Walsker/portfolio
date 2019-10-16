import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Navbar from './navbar';
import Home from 'pages/home';
import Portfolio from 'pages/portfolio';
import NotFound from 'pages/notFound';
import './index.css';

const withNavBar = (Component, props) => (
  <>
    <Navbar/>
    <Component {...props}/>
  </>
);

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' render={props => withNavBar(Home, props)}/>
      <Route path='/home' render={() => <Redirect to='/'/>}/>
      <Route path='/resume' render={() => <Redirect to='/wal_resume.pdf'/>}/>
      <Route path='/projects' render={() => <Redirect to='/portfolio'/>}/>
      <Route path='/portfolio' render={props => withNavBar(Portfolio, props)}/>
      <Route render={props => withNavBar(NotFound, props)}/>
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(<App/>, document.getElementById('root'));
