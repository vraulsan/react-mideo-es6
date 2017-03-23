import { ref, firebaseAuth } from '../config/constants'


export function logout () {
  return firebaseAuth().signOut()
}

export function login (email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function resetPassword (email) {
  return firebaseAuth().sendPasswordResetEmail(email)
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

export function addFav(user, imdbID) {
  return ref.child(`users/${user.uid}/favorites/${imdbID}`)
  .set({
    'isFavorite': 'true'
  })
  .then(() => user)
}