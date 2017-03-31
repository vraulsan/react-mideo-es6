import React, { Component } from 'react'
import { ref } from '../../config/constants'
import {styles} from '../../css/customStyles'
import Title from '../Title'

export default class Dashboard extends Component {
  state ={
    isLoading: true,
    favs: []
  }
  componentWillMount () {
    let favRef = ref.child(`users/${this.props.currentUser.uid}/favorites`);
    favRef.on('value', (snapshot) => {
      let favs = [];
      snapshot.forEach(eachTitle => {
        favs.push(<Title key={eachTitle.key} titleInfo={eachTitle.val()} currentUser={this.props.currentUser} />)
      })
      this.setState({favs: favs, isLoading: false});
    })
  }
  componentWillUnmount () {
    if (this.props.currentUser) {
      let favRef = ref.child(`users/${this.props.currentUser.uid}/favorites/`);
      return favRef.off('value');
    }
  }
  render () {
    return (
      <div>
        Dashboard. This is a protected route. You can only see this if you're authed.
        <p> {this.props.currentUser.email}</p>
        <h1> Your favorite media </h1>
        <div className="container-fluid">
         <table className="table table-striped">
            <thead><tr><th>IMDb ID</th><th>Title</th><th>Year</th><th style={styles.alignCenter}>Favorite</th></tr></thead>
            { this.state.isLoading
              ? <p>Is loading...</p>
              : <tbody>{this.state.favs}</tbody>
            }
          </table>
        </div>
      </div>
    )
  }
}