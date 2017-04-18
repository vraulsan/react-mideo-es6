import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyAXRZtOs38qq6h2koMFJIdlfLnFf0oYzHs",
  authDomain: "mideo-409bb.firebaseapp.com",
  databaseURL: "https://mideo-409bb.firebaseio.com",
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
