import React, { Component } from 'react'
import axios from 'axios'
import {styles} from '../css/customStyles'
import Favorite from './Favorite'

function searchDetails (imdbID) {
  return axios.get('http://www.omdbapi.com/?i='+imdbID)
}

export default class Title extends Component {
  state = {
    isExpanded: false,
    isLoading: false
  }
  componentWillMount = () => {
    this.info = {
      imdbID: this.props.titleInfo.imdbID,
      Title: this.props.titleInfo.Title,
      Year: this.props.titleInfo.Year
    }
    this.details = {}
  }
  expandTitle = () => {
    this.state.isExpanded
    ? this.setState({ isExpanded: false })
    : this.setState({ isExpanded: true, isLoading: true })
      searchDetails(this.info.imdbID)
        .then((results) => {
          this.details = results.data;
          this.setState({isLoading: false})
        })
  }
  render () {
    return (
      this.state.isExpanded
      ? this.state.isLoading
        ? <tr>
            <td>{this.info.imdbID}</td>
            <td>{this.info.Title}<hr /><h1>Is Loading...</h1></td>
            <td>{this.info.Year}</td>
          </tr>
        : <tr onClick={this.expandTitle}>
            <td><img role="presentation" className='img-rounded img-responsive' src={this.details.Poster} style={styles.posterStyle}/></td>
            <td>{this.info.Title}<h1 />
              <ul>
                <li><strong>Director:</strong> {this.details.Director}</li>
                <li><strong>Actor:</strong> {this.details.Actor}</li>
                <li><strong>Released:</strong> {this.details.Released}</li>
                <li><strong>Runtime:</strong> {this.details.Runtime}</li>
                <li><strong>IMDb Rating:</strong> {this.details.imdbRating}</li>
                <li><strong>Awards:</strong> {this.details.Awards}</li>
              </ul>
            </td>
            <td>{this.info.Year}</td>
            <Favorite states={this.props.states} imdbID={this.info.imdbID} />
          </tr>
      : <tr onClick={this.expandTitle}>
          <td>{this.info.imdbID}</td>
          <td>{this.info.Title}</td>
          <td>{this.info.Year}</td>
          <Favorite states={this.props.states} imdbID={this.info.imdbID}  />
        </tr>

    )
  }
}
