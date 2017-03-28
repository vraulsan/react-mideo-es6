import React, { Component } from 'react'
import {styles} from '../css/customStyles'
import { ref } from '../config/constants'
import { removeFav, addFav } from '../helpers/helpers'



export default class Favorite extends Component {
  state = {
    isFavorite: false
  }
  componentDidMount () {
    if (this.props.currentUser) {
      var favRef = ref.child(`users/${this.props.currentUser.uid}/favorites/${this.props.info.imdbID}`);
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
    ? removeFav(this.props.currentUser, this.props.info.imdbID)
    : addFav(this.props.currentUser, this.props.info)
  }
  componentWillUnmount () {
    if (this.props.currentUser) {
      var favRef = ref.child(`users/${this.props.currentUser.uid}/favorites/${this.props.info.imdbID}`);
      return favRef.off('value');
    }
  }
  render () {
    return (
      this.props.currentUser
      ? this.state.isFavorite
        ? <td onClick={this.clickOnStar} style={styles.alignAndFav}><i className="fa fa-star-o" aria-hidden="true"></i></td>
        : <td onClick={this.clickOnStar} style={styles.alignCenter}><i className="fa fa-star-o" aria-hidden="true"></i></td>
      : <td style={styles.alignCenter}><i className="fa fa-star-o" aria-hidden="true"></i></td>

    )
  }
}
