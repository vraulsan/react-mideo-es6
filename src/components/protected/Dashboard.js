import React, { Component } from 'react'
import {firebaseAuth} from '../../config/constants'

export default class Dashboard extends Component {
  render () {
    var currentUser = firebaseAuth().currentUser
    return (
      <div>
        Dashboard. This is a protected route. You can only see this if you're authed.
        <p> {currentUser.email}</p>
      </div>
    )
  }
}