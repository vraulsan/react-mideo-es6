import React, { Component } from 'react'
import axios from 'axios'
import {styles} from '../css/customStyles'
import { ref, firebaseAuth } from '../config/constants'
import { removeFav, addFav } from '../helpers/auth'



export default class Favorite extends Component {
  state = {
    isFavorite: false
  }
  componentDidMount () {
    if (this.props.states.currentUser) {
      var favRef = ref.child(`users/${this.props.states.currentUser.uid}/favorites/${this.props.imdbID}`);
      return favRef.on('value', (snapshot) => {
        snapshot.val()
        ? this.setState({isFavorite: true})
        : this.setState({isFavorite: false})
      })
    }
  }
  clickOnStar = (e) => {
    e.stopPropagation();
    this.state.isFavorite
    ? removeFav(this.props.states.currentUser, this.props.imdbID)
    : addFav(this.props.states.currentUser, this.props.imdbID)
  }
  componentWillUnmount () {
    if (this.props.states.currentUser) {
      var favRef = ref.child(`users/${this.props.states.currentUser.uid}/favorites/${this.props.imdbID}`);
      return favRef.off('value');
    }
  }
  render () {
    return (
      this.props.states.currentUser
      ? this.state.isFavorite
        ? <td onClick={this.clickOnStar} style={styles.alignAndFav}><i className="fa fa-star-o" aria-hidden="true"></i></td>
        : <td onClick={this.clickOnStar} style={styles.alignCenter}><i className="fa fa-star-o" aria-hidden="true"></i></td>
      : <td style={styles.alignCenter}><i className="fa fa-star-o" aria-hidden="true"></i></td>

    )
  }
}
