import React, { Component } from "react"
import {
  Button,
  Input,
  AppTitle,
  DisclaimText,
  HR,
  Avatar,
  MainName,
  UserName,
  Banner,
  Spacer
} from "../comps/styles.js"
import { logoutUser } from "../util/helper"
import { base } from "../util/base"
import { Redirect } from "react-router-dom"
import { width } from "window-size";

class Home extends Component {
  state = {
    birthDate: "",
    whatsappNumber: "",
    emailID: "",
    bloodGroup: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    middleName: "",
    redirectTo: ""
  }

  componentDidMount() {
    base.fetch(`users/${this.props.user.uid}/profile`, {
      context: this,
      then(data) {
        console.log(data)
        const {
          birthDate,
          whatsappNumber,
          emailID,
          bloodGroup,
          address1,
          address2,
          city,
          state,
          pincode,
          phoneNumber,
          firstName,
          lastName,
          middleName
        } = data
        if (!firstName) {
          this.setState({ redirectTo: "/onboard1" })
        } else if (!emailID) {
          this.setState({ redirectTo: "/onboard2" })
        }
        this.setState({
          birthDate,
          whatsappNumber,
          emailID,
          bloodGroup,
          address1,
          address2,
          city,
          state,
          pincode,
          phoneNumber,
          firstName,
          lastName,
          middleName
        })
      }
    })
  }

  editUser = () => {

  }

  render() {
    const { redirectTo } = this.state

    if (redirectTo) {
      return <Redirect to={redirectTo} />
    }

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <AppTitle>
          <div>Welcome Home!!</div>
          {/* <div>User: {this.props.user.uid}</div> */}
          <Avatar src="./assets/ekta_avatar.png" />
          <UserName>
            {this.state.firstName}
            <br />
            {this.state.lastName}
          </UserName>
          <HR/>
          <Banner style={{width:"100%"}}>
            <span>Click here to add your teacher details</span><Spacer/><span>></span>
          </Banner>
          <HR/>
          <Button onClick={this.editUser}>EDIT</Button>
          <Button style={{marginTop:12}} onClick={logoutUser}>LOGOUT</Button>
        </AppTitle>
      </div>
    )
  }
}

export default Home
