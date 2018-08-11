import {auth} from "./base.js"

export const logoutUser = () => {
  auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      console.log("ma man has left the building")
    })
    .catch(function(error) {
      // An error happened.
      console.log("issue signing out", error)
    })
}