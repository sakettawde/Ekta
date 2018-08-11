import React, { Component } from "react"
import { auth } from "../util/base"

class Logout extends Component {
  componentDidMount() {
    this.logoutUser()
  }

  logoutUser = () => {
    auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("ma man has left the building")
      })
      .catch(error => {
        // An error happened.
        console.log("issue signing out", error)
      })
  }

  render() {
    return (
      <div>
        <p>Logging you out...</p>
      </div>
    )
  }
}

export default Logout
