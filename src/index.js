import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import JobList from './components/JobList'
import EditJob from './components/EditJob'
import SingleJob from './components/SingleJob'

const Teamable = () => (
  <Router>
    <Switch>
      <Route path="/edit-job/:id">
        <EditJob />
      </Route>
      <Route path="/job/:id">
        <SingleJob />
      </Route>
      <Route path="/">
        <JobList />
      </Route>
    </Switch>
  </Router>
)

const root = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <Teamable />
  </Provider>,
  root
)
