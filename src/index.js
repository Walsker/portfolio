import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Navbar} from 'components';
import Home from 'home';
import Projects from 'projects';
import './index.css';

const App = () => (
  <Router>
    <Navbar/>
    <Route exact path='/' component={Home}/>
    <Route exact path='/projects' component={Projects}/>
  </Router>
);

ReactDOM.render(<App/>, document.getElementById('root'));
