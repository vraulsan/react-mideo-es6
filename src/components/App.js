import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Home from './Home'
import Header from './Header'
import Dashboard from './protected/Dashboard'
import { firebaseAuth } from '../config/constants'
import { PrivateRoute } from '../helpers/helpers'


export default class App extends Component {
  state = {
    authed: false,
    loading: true,
  }
  componentDidMount () {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        var currentUser = firebaseAuth().currentUser
        this.setState({
          authed: true,
          currentUser: currentUser,
          loading: false
        })
      } else {
        this.setState({
          loading: false,
          currentUser: null
        })
      }
    })
  }
  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <BrowserRouter>
        <div>
          <Header authed={this.state.authed} currentUser={this.state.currentUser}/>
          <div className="container">
            <div className="row">
              <Switch>
                <Route
                  path='/' exact
                  component={() => <Home currentUser={this.state.currentUser}/>}
                />
                <PrivateRoute
                  authed={this.state.authed}
                  path='/dashboard'
                  component={() => <Dashboard currentUser={this.state.currentUser}/>}
                />
                <Route render={() => <h3>No Match</h3>} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}