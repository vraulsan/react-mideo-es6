import React, { Component } from 'react'
import axios from 'axios'
import Title from './Title'
import {styles} from '../css/customStyles'

export default class Home extends Component {
  state = {
    Title: '',
    Year: '',
    results: '',
    isLoading: true,
    formError: null,
    totalResults: Number,
    totalPages: Number,
    currentPage: 1
  }
  updateTitle = (e) => {
    this.setState({Title: e.target.value})
  }
  updateYear = (e) => {
    this.setState({Year: e.target.value})
  }
  queryOMDB = (title, year, type, page) => {
    axios.get('http://www.omdbapi.com/?s=' + title + '&y=' + year + '&type=' + type + '&page=' + page)
    .then (results => {
      this.setState({
        totalResults: Number(results.data.totalResults),
        totalPages: Math.ceil(Number(results.data.totalResults/10))
        })
      results = results.data.Search.map(eachTitle => {
        return <Title key={eachTitle.imdbID} titleInfo={eachTitle} currentUser={this.props.currentUser} />
      })
      this.setState({
            results: results,
            isLoading: false
      })
    })
  }
  submitForm = (e) => {
    e.preventDefault()
    let type = document.getElementById("mySelect").value
    if (this.state.Title === '') {
      this.setState({formError: 'You must enter a title name'})
    } else {
      this.setState({isLoading: true, formError: null})
      this.queryOMDB(this.state.Title, this.state.Year, type, this.state.currentPage)
    }
  }
  prevPage = () => {
    if (this.state.currentPage === 1) { return null }
    let pager = this.state.currentPage - 1;
    let type = document.getElementById("mySelect").value
    this.setState(
      {currentPage: this.state.currentPage - 1},
      this.queryOMDB(this.state.Title, this.state.Year, type, pager)
    );
  }
  nextPage = () => {
    if (this.state.currentPage === this.state.totalPages) { return null }
    let type = document.getElementById("mySelect").value
    let pager = this.state.currentPage + 1;
    this.setState(
      {currentPage: this.state.currentPage + 1},
      this.queryOMDB(this.state.Title, this.state.Year, type, pager)
    );
  }
  render () {
    return (
      <div>
        <div className="row">
        <div className="container">
        <div className="col-sm-4 col-sm-offset-4">
          <h1> Media Query</h1>
          <form id="thisForm" onSubmit={this.submitForm}>
            <div className="form-group" required="">
              <label>Title</label>
              <input className="form-control" onChange={this.updateTitle} placeholder="Title"/>
            </div>
            <div className="form-group">
              <label>Year</label>
              <input className="form-control" onChange={this.updateYear} placeholder="Year"/>
            </div>
            <div className="form-group">
              <label>Type</label>
              <select id="mySelect" className="form-control">
                <option defaultValue value="movie">Movie</option>
                <option value="series">Series</option>
              </select>
            </div>
            {
              this.state.formError &&
              <div className="alert alert-danger" role="alert">
                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                &nbsp;&nbsp;&nbsp;&nbsp;{this.state.formError}
              </div>
            }
            <button type="submit" className="btn btn-primary">Search</button>
          </form>
        </div>
        <div className="container-fluid">
          { this.state.results
            ? this.state.isLoading
              ? <h1> Loading... </h1>
              : <div>
                  <table className="table table-striped">
                    <thead><tr><th>IMDb ID</th><th>Title</th><th>Year</th><th style={styles.alignCenter}>Favorite</th></tr></thead>
                    <tbody>{this.state.results}</tbody>
                  </table>
                  <hr />
                  <nav aria-label="...">
                    <ul className="pager">
                      Results: {this.state.totalResults}&nbsp;&nbsp;
                      Total Pages: {Math.ceil(this.state.totalResults/10)}&nbsp;&nbsp;
                      Current Page: {this.state.currentPage} <br /><br />
                      <li onClick={this.prevPage}><a href="#">Previous</a></li>&nbsp;&nbsp;
                      <li onClick={this.nextPage}><a href="#">Next</a></li>
                    </ul>
                  </nav>

                </div>
            : <p />
          }
        </div>
      </div>
      </div>
      </div>
    )
  }
}