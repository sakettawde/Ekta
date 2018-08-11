import React, { Component } from "react"
import { auth } from "../util/base"
// import { Redirect } from "react-router-dom";
import styled from "styled-components"

class Login extends Component {
  state = {
    otp: "",
    mobile: "",
    loggedIn: false,
    user: {},
    loading: true,
    OTPsent: false,
    OTPrequested: false,
    OTPverifying: false
  }

  componentDidMount() {

    // this.logoutUser()

    window.recaptchaVerifier = new auth.RecaptchaVerifier("recaptcha-container")
    window.recaptchaVerifier.render().then(function(widgetId) {
      window.recaptchaWidgetId = widgetId
    })
  }

  onSignInSubmit = () => {
    console.log("recaptcha worked properly")
  }

  submitPressed = () => {
    this.setState({ OTPrequested: true })
    console.log("submit pressed")
    let phoneNumber = "+91" + this.state.mobile
    let appVerifier = window.recaptchaVerifier
    console.log(appVerifier)
    auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult)=>{
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        this.setState({ OTPsent: true })
        console.log(confirmationResult)
        window.confirmationResult = confirmationResult
      })
      .catch((error)=>{
        // Error; SMS not sent
        // ...
        console.log("sms not sent, error: ", error)
        this.setState({ OTPrequested: false })
        // window.recaptchaVerifier.render().then(function(widgetId) {
        //     grecaptcha.reset(widgetId);
        //   })
      })
  }

  cancelOTP = () => {
    this.setState({
    OTPsent: false,
    OTPrequested: false,
    OTPverifying: false,
    otp: ""
    })
  }

  verifyOTP = () => {
    this.setState({OTPverifying: true})
    let code = this.state.otp
    window.confirmationResult
      .confirm(code)
      .then(result => {
        // User signed in successfully.
        let user = result.user
        console.log("user", user)
        console.log("result", result)
        this.setState({redirectToHome: true})
      })
      .catch(error => {
        // User couldn't sign in (bad verification code?)
        this.cancelOTP()
        alert("An error occured. Please try again.")
        console.log("error", error)
      })
  }

  render() {

    // if(this.state.redirectToHome){
    //   return(<Redirect to="/home" push/>)
    // }

    // if(this.props.user.uid){
    //   console.log("render",this.props.user.uid)
    //   return(<Redirect to="/home"/>)
    // }

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems:"center"
        }}
      >
        <AppTitle>
          <MainName>Ekta</MainName>
          <Logo src="./assets/aol-logo.png" />
          <SubName>An AOL Community Initiative</SubName>
          <ZoneName>PUNE</ZoneName>
          <HR />
          <p>Welcome!</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <label>Mobile Number:</label>
            <span>&nbsp;+91</span>
            <MobileInput
              disabled={this.state.OTPsent}
              onChange={e => {
                this.setState({ mobile: e.target.value })
              }}
              value={this.state.mobile}
            />
          </div>
          <DisclaimText>
            We shall not share your mobile number with anyone. This is purely
            for login purposes on this webapp.
          </DisclaimText>
          <div id="recaptcha-container" style={{display:this.state.OTPsent?"none":"inline"}} />
          <DisclaimText>Prove to us you are a human :P</DisclaimText>
          <Button
            disabled={this.state.OTPrequested}
            id="sign-in-button"
            onClick={this.submitPressed}
          >
            REQUEST OTP
          </Button>
          <br />
          {this.state.OTPsent && (
            <OTPDiv>
              <div style={{ display: "flex", alignItems: "center" }}>
                <label>OTP:</label>
                <MobileInput
                  onChange={e => {
                    this.setState({ otp: e.target.value })
                  }}
                  value={this.state.otp}
                  disabled={this.state.OTPverifying}
                />
              </div>
              <Button disabled={this.state.OTPverifying} onClick={this.verifyOTP}>VERIFY &amp; ENTER</Button>
              <TextButton onClick={this.cancelOTP}>Cancel</TextButton>
            </OTPDiv>
          )}
        </AppTitle>
      </div>
    )
  }
}

const Button = styled.button`
  background: #66bb6a;
  padding: 12px;
  border-radius: 8px;
  border: none;
  color: #fff;

  &:active {
    box-shadow: 0 0 20px #66bb6a;
    outline: none;
  }

  &:disabled {
    background: #e0e0e0;
  }
`

const TextButton = styled.button`
  background: none;
  padding: 12px;
  border-radius: 8px;
  border: none;
  text-decoration: underline;
  opacity: 0.5;
`

const MobileInput = styled.input`
  border-radius: 4px;
  border: 1px solid #cfd8dc;
  font-family: "Nunito Sans", sans-serif;
  font-size: 16px;
  padding: 4px;
  margin: 8px;
  &:focus {
    border: 1px solid #607d8b;
    box-shadow: 0 0 5px #cfd8dc;
    /* background-color: #eee; */
    outline: 0;
  }
`

const DisclaimText = styled.span`
  font-size: 10px;
  color: #607d8b;
  text-align: center;
  margin: 8px;
`

const Logo = styled.img`
  width: 180px;
  margin: 20px;
`

const HR = styled.div`
  height: 1px;
  background-color: #eee;
  width: 100%;
  margin-top: 8px;
  margin-bottom: 8px;
`

const OTPDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const AppTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 8px;
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  max-width: 760px;
  box-shadow: 0 0 5px #455A64;
`

const MainName = styled.span`
  font-family: "Muli", sans-serif;
  font-size: 40px;
  font-weight: 900;
  opacity: 0.8;
`

const SubName = styled.span`
  font-family: "Nunito Sans", sans-serif;
  /* font-size: 22px; */
  color: grey;
  text-align: center;
`

const ZoneName = styled.span`
  font-family: "Nunito Sans", sans-serif;
  /* font-size: 18px; */
  margin-top: 12px;
  color: palevioletred;
  background-color: papayawhip;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 8px;
  padding-right: 8px;
`

export default Login
