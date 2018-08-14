import React, { Component } from 'react';
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
    ProfileSubHead,
    Select
  } from "../comps/styles.js"
import styled from 'styled-components';
import { base } from '../util/base.js';
import { Redirect } from "react-router-dom"
import Loader from "../comps/Loading.js"

class EditWork extends Component {
    state = { 
        profession: "",
        role: "",
        empBusColName: "",
            empBusColArea: "",
            empBusColCity: "",
            empBusColWeb: ""
     }

    onChangeSelect =(e)=> {
        // console.log(e.target.value)
        this.this.setState({profession: e.target.value})
    }

    updateWorkDetails = () => {
        const {
            profession,
            role,
            empBusColName,
            empBusColArea,
            empBusColCity,
            empBusColWeb
        } = this.state

        const self = this

        base
      .update(`users/${this.props.user.uid}/workDetails`,{
      data: {
        profession,
            role,
            empBusColName,
            empBusColArea,
            empBusColCity,
            empBusColWeb
      }})
      .then(() => {
        console.log("data updated")
        self.setState({redirectTo: "/home"})
      })
      .catch(err => {
        console.log("Something went wrong, try again", err)
      })
    }


    render() {

        if (this.state.redirectTo) {
            return <Redirect to={this.state.redirectTo} push />
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
      <ProfileSubHead>Edit Work Details</ProfileSubHead>
        <br/>
        <span style={{alignSelf:"center"}}>Add/Edit your work details here</span>
        <HR/>
        <br/>
        <div style={{ display: "flex", flexDirection: "column", alignSelf:"center" }}>
          <InputContainer>
            <label>Profession<span style={{color:"#EF5350"}}>*</span></label>
            <Spacer/>
            <Select onChange={(e)=>this.onChangeSelect(e)}>
            <option>Service</option>
            <option>Business</option>
            <option>Student</option>
            <option>HomeMaker</option>
            <option>Self Employed</option>
            <option>Other</option>
            </Select>
          </InputContainer>
          <InputContainer>
            <label>Your Role/Position</label>
            <Spacer/>
            <Input
              onChange={e => {
                  this.setState({ role: e.target.value })
                }}
                value={this.state.role}
                />
          </InputContainer>
          <br/>
          <ProfileSubHead style={{fontSize:18}}>Employer/Business/College Information</ProfileSubHead>
          <HR/>
          <InputContainer style={{flexDirection:"column", alignItems:"flex-start"}}>
            <label>Employer/Business/College Name<span style={{color:"#EF5350"}}>*</span></label>
            <Input
              onChange={e => {
                  this.setState({ empBusColName: e.target.value })
                }}
                value={this.state.empBusColName}
                />
          </InputContainer>
          <InputContainer style={{flexDirection:"column", alignItems:"flex-start"}}>
            <label>Employer/Business/College Area<span style={{color:"#EF5350"}}>*</span></label>
            <Input
              onChange={e => {
                  this.setState({ empBusColArea: e.target.value })
                }}
                value={this.state.empBusColArea}
                />
          </InputContainer>
          <InputContainer style={{flexDirection:"column", alignItems:"flex-start"}}>
            <label>Employer/Business/College City<span style={{color:"#EF5350"}}>*</span></label>
            <Input
              onChange={e => {
                  this.setState({ empBusColCity: e.target.value })
                }}
                value={this.state.empBusColCity}
                />
          </InputContainer>
          <InputContainer style={{flexDirection:"column", alignItems:"flex-start"}}>
            <label>Employer/Business/College Website<span style={{color:"#EF5350"}}>*</span></label>
            <Input
              onChange={e => {
                  this.setState({ empBusColWeb: e.target.value })
                }}
                value={this.state.empBusColWeb}
                />
          </InputContainer>
        </div>
        <p style={{color:"#EF5350"}}>{this.state.warning}</p>
        <br/>
        <div style={{display:"flex", alignSelf: "flex-end"}}>
        <Button onClick={this.updateWorkDetails}>SAVE</Button>
        </div>
                </AppTitle>
      </div>
        );
    }
}

const InputContainer = styled.div`
  display: flex;
  align-items: center;
`

export default EditWork;