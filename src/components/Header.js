import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { logout, saveUserGoogle } from '../helpers/helpers'
import firebase from 'firebase'
import {styles} from '../css/customStyles'

export default class Header extends Component {
  state = {
    authed: this.props.authed
  }
  handleGoogle = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.email');
    firebase.auth().signInWithPopup(provider)
      .then(result => {
        //let token = result.credential.accessToken; use this Token to access Google API
        let user = result.user
        saveUserGoogle(user);
      })
      .catch(error => console.log(error))
  }
  render () {
    return (
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
              {this.props.currentUser
                ? <span>
                    <Link to="/Dashboard" className="navbar-brand">{this.props.currentUser.displayName.split(" ")[0]}</Link>
                    <Link to="/"
                      onClick={() => {
                        logout()
                        this.setState({authed: false})
                      }}
                      className="navbar-brand">Logout
                    </Link>
                  </span>
                : <span>
                    <button
                      style={styles.buttonStyle}
                      onClick={this.handleGoogle}
                      className="navbar-brand">Login</button>
                  </span>}
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

