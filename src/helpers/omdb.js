import axios from 'axios'


export function searchResults (titleToSearch, yearToSearch, typeToSearch) {
  return axios.get('http://www.omdbapi.com/?s=' + titleToSearch + '&y=' + yearToSearch + '&type=' + typeToSearch)
}

export function searchDetails (imdbID) {
  return axios.get('http://www.omdbapi.com/?i=' + imdbID)
}


