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
  Icon,
  TextButton,
  FlexRow,
  ProfileSubHead
} from "../comps/styles.js"
import { base } from "../util/base"
import { Redirect } from "react-router-dom"
import Loader from "../comps/Loading.js"

class ViewProfile extends Component {
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
    avatar: ""
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
          middleName,
          avatar
        } = data

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

  toggleAvatar = () => {
    let newAvatarValue = this.state.avatar == 1 ? 2 : 1
    this.setState({
      avatar: newAvatarValue
    })
    this.updateAvatar(newAvatarValue)
  }

  render() {
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
      middleName,
      avatar,
      redirectTo,
      loading
    } = this.state

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
          alignItems: "center",
        }}
      >
        <AppTitle>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minWidth:280
            }}
          >
            <Avatar
              style={{ alignSelf: "center" }}
              onClick={this.toggleAvatar}
              src={`./assets/ekta_avatar${avatar}.png`}
            />
            <span style={{ alignSelf: "center" }}>
              Click on the image to change it
            </span>
            <FlexRow style={{ alignItems: "center" }}>
              <ProfileSubHead>General Details</ProfileSubHead>
              <TextButton>Edit</TextButton>
            </FlexRow>
            <HR />
            <FlexRow>
              <span style={{flex:1}}>First Name</span>
              <span style={{flex:2}}>{firstName}</span>
            </FlexRow>
            <FlexRow>
              <span style={{flex:1}}>Middle Name</span>
              <span style={{flex:2}}>{middleName}</span>
            </FlexRow>
            <FlexRow>
              <span style={{flex:1}}>Last Name</span>
              <span style={{flex:2}}>{lastName}</span>
            </FlexRow>
            <FlexRow>
              <span style={{flex:1}}>Phone Number</span>
              <span style={{flex:2}}>{phoneNumber}</span>
            </FlexRow>
            <FlexRow>
              <span style={{flex:1}}>Whatsapp Number</span>
              <span style={{flex:2}}>{whatsappNumber}</span>
            </FlexRow>
            <FlexRow>
              <span style={{flex:1}}>Email ID</span>
              <span style={{flex:2}}>{emailID}</span>
            </FlexRow>
            <FlexRow>
              <span style={{flex:1}}>Blod Group</span>
              <span style={{flex:2}}>{bloodGroup}</span>
            </FlexRow>
            <FlexRow>
              <span style={{flex:1}}>Address Line 1</span>
              <span style={{flex:2}}>{address1}</span>
            </FlexRow>
            <DetailRow label="City" value={city}></DetailRow>
            <DetailRow label="State" value={state}></DetailRow>
            <DetailRow label="Pincode" value={pincode}></DetailRow>
            <DetailRow label="Birth Date" value={birthDate}></DetailRow>
          </div>
        </AppTitle>
      </div>
    )
  }
}

const DetailRow = (props) => {
    return (
        <FlexRow>
              <span style={{flex:1}}>{props.label}</span>
              <span style={{flex:2}}>{props.value}</span>
            </FlexRow>
    )
}

export default ViewProfile
