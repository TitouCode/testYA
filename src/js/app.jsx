'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import QuestionContainer from './modules/home.jsx';


ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={QuestionContainer}/>
  </Router>
), document.getElementById('app'));
