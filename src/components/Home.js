import React, { Component } from 'react'
import axios from 'axios'
import Title from './Title'

function searchResults (titleToSearch, yearToSearch, typeToSearch) {
  return axios.get('http://www.omdbapi.com/?s=' + titleToSearch + '&y=' + yearToSearch + '&type=' + typeToSearch)
}

export default class Home extends Component {
  state = {
    titleToSearch: '',
    yearToSearch: '',
    typeToSearch: '',
    queried: false,
    results: '',
    isLoading: false
  }
  updateTitle = (e) => {
    this.setState({titleToSearch: e.target.value})
  }
  updateYear = (e) => {
    this.setState({yearToSearch: e.target.value})
  }
  changeType = (e) => {
    this.setState({typeToSearch: e.target.value})
  }
  submitForm = (e) => {
    e.preventDefault()
    this.state.titleToSearch === ''
    ? null
    : this.setState({isLoading: true})
      searchResults(this.state.titleToSearch, this.state.yearToSearch, this.state.typeToSearch)
        .then((results) => {
          this.setState({ queried: true });
          var results = results.data.Search.map(eachTitle => {
            return <Title key={eachTitle.imdbID} titleInfo={eachTitle} authed={this.props.authed} />
          })
          this.setState({
            results: results,
            isLoading: false
          })
        })
  }
  render () {
    return (
      <div>
        <div className="container">
          <h1> Media Query</h1>
          <form onSubmit={this.submitForm}>
            <div className="form-group">
              <label>Title</label>
              <input className="form-control" onChange={this.updateTitle} placeholder="Title"/>
            </div>
            <div className="form-group">
              <label>Year</label>
              <input className="form-control" onChange={this.updateYear} placeholder="Year"/>
            </div>
            <div className="form-group">
              <label>Type</label>
              <select className="form-control" onChange={this.updateType}>
                <option defaultValue value="movie">Movie</option>
                <option value="series">Series</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Search</button>
          </form>
        </div>
        <div className="container-fluid">
          { this.state.results
            ? this.state.isLoading
              ? <h1> Loading... </h1>
              : <table className="table table-striped">
                  <thead><tr><th>IMDb ID</th><th>Title</th><th>Year</th><th>Operations</th></tr></thead>
                  <tbody>{this.state.results}</tbody>
                 </table>
            : <p />
          }
        </div>
      </div>
    )
  }
}