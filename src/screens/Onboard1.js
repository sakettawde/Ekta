import React, { Component } from "react"
import { Button, Input, AppTitle } from "../comps/styles.js"
import { Redirect } from "react-router-dom";
import {base} from "../util/base.js"
import styled from "styled-components"

class Onboard1 extends Component {
  state = {
    firstName: "",
    middleName: "",
    lastName: "",
    warning: "",
    redirectToOB2: false
  }

  componentDidMount(){
    console.log("Onboard1",this.props.user)
  }

  updateName = () => {
      this.setState({warning: ""})
      if(!this.state.firstName){
        this.setState({warning: "Please enter a valid first name"})
        return
    }
    if(!this.state.lastName){
        this.setState({warning: "Please enter a valid last name"})
        return
      }
    // console.log(base.timestamp)
      let self = this
    base.post(`users/${this.props.user.uid}/profile`, {
        data: {firstName: this.state.firstName,
        middleName: this.state.middleName,
    lastName: this.state.lastName},
        then(err){
          if(!err){
            self.setState({redirectToOB2: true})
            console.log("Done man")
          } else {
              console.log("Something went wrong. Error:", err)
          }
        }
      });
      
  }

  render() {

    if(this.state.redirectToOB2){
        return(<Redirect to="/onboard2"/>)
    }

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
      <AppTitle style={{alignItems: "flex-start"}}>
        <span>Hi! This is the start of a most wonderful initiative!</span>
        <span>It's 2018 and it's difficult for all of us to keep in touch sometimes, plus there is just so much happening!</span>
        <span>We thought we will solve all that but in a fun way.</span>
        <span>We are creating one single source of truth for everybody in our community to be on the same page. And we need your help to get there.</span>
        <br/>
        <span style={{alignSelf:"center"}}>Let's begin with your name!</span>
        <br/>
        <div style={{ display: "flex", flexDirection: "column", alignSelf:"center" }}>
          <InputContainer>
            <label>First Name<span style={{color:"#EF5350"}}>*</span></label>
            <Spacer/>
            <Input
              onChange={e => {
                  this.setState({ firstName: e.target.value })
                }}
                value={this.state.firstName}
                />
          </InputContainer>
          <InputContainer>
            <label>Middle Name</label>
            <Spacer/>
            <Input
              onChange={e => {
                  this.setState({ middleName: e.target.value })
                }}
                value={this.state.middleName}
                />
          </InputContainer>
          <InputContainer>
            <label>Last Name<span style={{color:"#EF5350"}}>*</span></label>
            <Spacer/>
            <Input
              onChange={e => {
                  this.setState({ lastName: e.target.value })
                }}
                value={this.state.lastName}
                />
          </InputContainer>
        </div>
        <p style={{color:"#EF5350"}}>{this.state.warning}</p>
        <br/>
        <div style={{display:"flex", alignSelf: "flex-end"}}>
        <Button onClick={this.updateName}>NEXT ></Button>
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
flex:1;`

export default Onboard1
