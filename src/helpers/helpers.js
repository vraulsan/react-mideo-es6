import { ref, firebaseAuth } from '../config/constants'
import { Route, Redirect } from 'react-router-dom'
import React from 'react'

export function logout () {
  return firebaseAuth().signOut()
}

export function addNameAndSave(user, name) {
  return user.updateProfile({displayName: name})
    .then(saveUser(user, name))
}

export function saveUser(user, name) {
  return ref.child(`users/${user.uid}/info`)
    .set({
        email: user.email,
        uid: user.uid,
        displayName: name
      })
      .then(() => user)
}

export function saveUserGoogle(user) {
  return ref.child(`users/${user.uid}/info`)
    .set({
        email: user.email,
        uid: user.uid,
        displayName: user.displayName.split(" ")[0]
      })
      .then(() => user)
}

export function removeFav(user, imdbID) {
  var favRef = ref.child(`users/${user.uid}/favorites/${imdbID}`)
  favRef.remove()
    .then(() => console.log('Unfavorited'))
    .catch((error) => console.log('Error: ', error))
}

export function addFav(user, info) {
  return ref.child(`users/${user.uid}/favorites/${info.imdbID}`)
  .set({
    'imdbID': info.imdbID,
    'Title': info.Title,
    'Year': info.Year
  })
  .then(() => user)
}

export function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect
            to={{
              pathname: '/',
              state: {
                from: props.location
              }
            }}
          />
      }
    />
  )
}
