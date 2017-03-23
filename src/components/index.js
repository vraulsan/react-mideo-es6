import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import Home from './Home'
import Dashboard from './protected/Dashboard'
import { logout, saveUserGoogle } from '../helpers/auth'
import { firebaseAuth } from '../config/constants'
import firebase from 'firebase'


function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/dashboard' />}
    />
  )
}

export default class App extends Component {
  state = {
    authed: false,
    loading: true,
  }
  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        var currentUser = firebaseAuth().currentUser
        this.setState({
          authed: true,
          currentUser: currentUser,
          loading: false
        })
      } else {
        this.setState({
          loading: false
        })
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
  }
  handleGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.email');
    firebase.auth().signInWithPopup(provider)
      .then(result => {
        var token = result.credential.accessToken; //use this Token to access Google API
        var user = result.user
        saveUserGoogle(user);
      })
      .catch(error => console.log(error))
  }
  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <BrowserRouter>
        <div>
          <nav className="navbar navbar-default navbar-static-top">
            <div className="container">
              <div className="navbar-header">
                <Link to="/" className="navbar-brand">Mideo</Link>
              </div>
              <ul className="nav navbar-nav pull-right">
                <li>
                  <Link to="/" className="navbar-brand">Home</Link>
                </li>
                <li>
                  {this.state.authed
                    ? <span>
                        <Link to="/Dashboard" className="navbar-brand">{this.state.currentUser.displayName}</Link>
                      <button
                        style={{border: 'none', background: 'transparent'}}
                        onClick={() => {
                          logout()
                          this.setState({authed: false})
                        }}
                        className="navbar-brand">Logout</button>
                      </span>
                    : <span>
                        <button
                        style={{border: 'none', background: 'transparent'}}
                        onClick={this.handleGoogle}
                        className="navbar-brand">Login</button>
                      </span>}
                </li>
              </ul>
            </div>
          </nav>
          <div className="container">
            <div className="row">
              <Switch>
                <Route path='/' exact component={() => (<Home states={this.state}/>)}/>
                <PrivateRoute authed={this.state.authed} path='/dashboard' component={Dashboard} />
                <Route render={() => <h3>No Match</h3>} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}