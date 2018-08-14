import React, { Component } from "react"
import { Button, Input, AppTitle, DisclaimText, HR } from "../comps/styles.js"
import { Redirect } from "react-router-dom";
import { base } from "../util/base.js"
import styled from "styled-components"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import moment from "moment"

class Onboard2 extends Component {
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
    warning: "",
    redirectToHome: false
  }

  componentDidMount() {}

  handleChange = date => {
    this.setState({
      birthDate: date ? date.format("DD/MM/YYYY") : ""
    })
  }

  updateBasicDetails = () => {
    this.setState({ warning: "" })
    const {birthDate,
    whatsappNumber,
    emailID,
    bloodGroup,
    address1,
    address2,
    city,
    state,
    pincode} = this.state

    if (!this.state.emailID) {
      this.setState({ warning: "Please enter a valid email ID" })
      return
    }

    let self = this
    base
      .update(`users/${this.props.user.uid}/profile`,{
      data: {
        phoneNumber: this.props.user.phoneNumber,
        birthDate,
    whatsappNumber:whatsappNumber||this.props.user.phoneNumber,
    emailID,
    bloodGroup,
    address1,
    address2,
    city,
    state,
    pincode,
    avatar:1,
    onBoarded:false
      }})
      .then(() => {
        console.log("data updated")
        self.setState({redirectToHome: true})
      })
      .catch(err => {
        console.log("Something went wrong, try again", err)
      })
  }

  render() {

    if(this.state.redirectToHome){
        return(<Redirect to="/home"/>)
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
          <span style={{ alignSelf: "center" }}>
            Your Contact Details please
          </span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignSelf: "center"
            }}
          >
            <DisclaimText>
              We shall not share your mobile number or email id with anyone.
              This will only be used by the VVKI Pune office to convey important
              information with you and stay in touch with you. This will not be
              used for promotional material usless you explicitly agree to it.
            </DisclaimText>
            <br />
            <InputContainer>
              <label>Phone Number</label>
              <Spacer />
              <span>{this.props.user.phoneNumber}</span>
            </InputContainer>
            <HR />
            <InputContainer>
              <label>Whatsapp Number (if different)</label>
              <Spacer />
              <Input
                onChange={e => {
                  this.setState({ whatsappNumber: e.target.value })
                }}
                value={this.state.whatsappNumber}
              />
            </InputContainer>
            <InputContainer>
              <label>
                Email ID<span style={{ color: "#EF5350" }}>*</span>
              </label>
              <Spacer />
              <Input
                onChange={e => {
                  this.setState({ emailID: e.target.value })
                }}
                value={this.state.emailID}
              />
            </InputContainer>
            <InputContainer>
              <label>Date of Birth</label>
              <Spacer />
              <DatePicker
                selected={
                  this.state.birthDate &&
                  moment(this.state.birthDate, "DD/MM/YYYY")
                }
                onChange={this.handleChange}
                maxDate={moment()}
                className="date-picker"
                dateFormat="DD/MM/YYYY"
                showYearDropdown
                showMonthDropdown
              />
            </InputContainer>
            <InputContainer>
              <label>Blood Group</label>
              <Spacer />
              <Input
                onChange={e => {
                  this.setState({ bloodGroup: e.target.value })
                }}
                value={this.state.bloodGroup}
              />
            </InputContainer>
            <br />
            <span>Contact Address</span>
            <HR />
            <InputContainer>
              <label>Address Line 1</label>
              <Spacer />
              <Input
                onChange={e => {
                  this.setState({ address1: e.target.value })
                }}
                value={this.state.address1}
              />
            </InputContainer>
            <InputContainer>
              <label>Address Line 2</label>
              <Spacer />
              <Input
                onChange={e => {
                  this.setState({ address2: e.target.value })
                }}
                value={this.state.address2}
              />
            </InputContainer>
            <InputContainer>
              <label>City</label>
              <Spacer />
              <Input
                onChange={e => {
                  this.setState({ city: e.target.value })
                }}
                value={this.state.city}
              />
            </InputContainer>
            <InputContainer>
              <label>State</label>
              <Spacer />
              <Input
                onChange={e => {
                  this.setState({ state: e.target.value })
                }}
                value={this.state.state}
              />
            </InputContainer>
            <InputContainer>
              <label>Pin Code</label>
              <Spacer />
              <Input
                onChange={e => {
                  this.setState({ pincode: e.target.value })
                }}
                value={this.state.pincode}
              />
            </InputContainer>
          </div>
          <p style={{ color: "#EF5350" }}>{this.state.warning}</p>
          <br />
          <div style={{ display: "flex", alignSelf: "flex-end" }}>
            <Button onClick={this.updateBasicDetails}>NEXT ></Button>
          </div>
        </AppTitle>
      </div>
    )
  }
}

const InputContainer = styled.div`
  display: flex;
  align-items: center;
`

const Spacer = styled.div`
  flex: 1;
`

export default Onboard2
