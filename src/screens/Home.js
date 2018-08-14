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
  Banner2,
  Spacer,
  AreaName,
  Icon
} from "../comps/styles.js"
import { logoutUser } from "../util/helper"
import { base } from "../util/base"
import { Redirect } from "react-router-dom"
import Loader from "../comps/Loading.js"

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
    redirectTo: "",
    loading: true,
    avatar: "",
    onBoarded: false
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
          avatar,
          middleName,
          onBoarded
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
          middleName,
          avatar,
          onBoarded,
          loading: false
        })
      }
    })
  }

  formatNumber = input => {
    return input.substr(3)
  }

  updateAvatar = avatar => {
    base.update(`users/${this.props.user.uid}/profile`, {
      data: { avatar: avatar },
      then(err) {
        if (err) {
          console.log("An error occured, error msg: ", err)
          return
        }
        console.log("Everything went well")
      }
    })
  }

  closeAnnounce = () => {
    base.update(`users/${this.props.user.uid}/profile`, {
      data: { onBoarded: true },
      then(err) {
        if (err) {
          console.log("An error occured, error msg: ", err)
          return
        }
        console.log("Everything went well")
      }
    })
    this.setState({onBoarded:true})
  }

  toggleAvatar = () => {
    let newAvatarValue = this.state.avatar == 1 ? 2 : 1
    this.setState({
      avatar: newAvatarValue
    })
    // this.updateAvatar(newAvatarValue)
  }

  render() {
    const { redirectTo, loading } = this.state

    if (redirectTo) {
      return <Redirect to={redirectTo} push />
    }

    if (loading) {
      return <Loader />
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
          {/* <div>User: {this.props.user.uid}</div> */}
          <Avatar
            onClick={this.toggleAvatar}
            src={`./assets/ekta_avatar${this.state.avatar}.png`}
          />
          <UserName>
            {`${this.state.firstName} ${this.state.lastName}`}
          </UserName>
          <AreaName>Shivajinagar</AreaName>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Icon src="./assets/phone_ekta.png" />
            <span>{this.formatNumber(this.state.phoneNumber)}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Icon src="./assets/email.png" />
            <span>{this.state.emailID}</span>
          </div>
          <HR />
          {!this.state.onBoarded && (
            <AppTitle>
              <Banner>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span>Welcome!</span>
                  <span>
                    This is your online connection to the Art Of Living
                    Community around you!
                  </span>
                  <br />
                  <span>
                    This portal exists to make it easier for you to keep track
                    of things that are happening in the Art Of Living. Tell us a
                    little about yourself and lets get started! :)
                  </span>
                </div>
                <span
                  onClick={this.closeAnnounce}
                  title="Close announcement"
                  style={{ color: "red" }}
                >
                  X
                </span>
              </Banner>
            </AppTitle>
          )}
          <Banner2
            onClick={() => this.setState({ redirectTo: "ViewProfile" })}
            bgColor="#2196F3"
          >
            <Spacer />
            <span>View Details</span>
            <Spacer />
          </Banner2>
          <HR />
          {/* <Banner2 bgColor="#EF5350">
            <span>Click here to add your teacher details</span>
            <Spacer />
            <span>></span>
          </Banner2>
          <HR />
          <Banner2>
            <span>Add your family information as well</span>
            <Spacer />
            <span>></span>
          </Banner2>
          <HR /> */}
          <Banner2 onClick={() => this.setState({ redirectTo: "editwork" })} bgColor="#4CAF50">
            <span>Tell us about your work</span>
            <Spacer />
            <span>></span>
          </Banner2>
          <HR />
          <Banner2 bgColor="#009688">
            <span>Click here and tell us a little about yourself</span>
            <Spacer />
            <span>></span>
          </Banner2>
          <HR />
          <span>--- Coming Soon ---</span>
          <Banner disabled>
            <span>Followup details in your area</span>
          </Banner>
          <Banner disabled>
            <span>Satsangs (musical evenings) around you</span>
          </Banner>
          <Banner disabled>
            <span>View divine shops across Pune city</span>
          </Banner>
          <Banner disabled>
            <span>Upcoming Courses &amp; Special Events</span>
          </Banner>
          <span>
            Note: The information on this page is viewable only by you and VVKI
            Pune (Art Of Living Pune Office)
            <br />
            This information will not be shared with anyone for any reason.
          </span>
          <br />
          <Button style={{ marginTop: 12 }} onClick={logoutUser}>
            LOGOUT
          </Button>
        </AppTitle>
      </div>
    )
  }
}

export default Home
