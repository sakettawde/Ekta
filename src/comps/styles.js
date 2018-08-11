import styled from "styled-components"

export const Button = styled.button`
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

export const TextButton = styled.button`
  background: none;
  padding: 12px;
  border-radius: 8px;
  border: none;
  text-decoration: underline;
  opacity: 0.5;
`

export const Input = styled.input`
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

export const DisclaimText = styled.span`
  font-size: 10px;
  color: #607d8b;
  text-align: center;
  margin: 8px;
`

export const Logo = styled.img`
  width: 180px;
  margin: 20px;
`

export const Avatar = styled.img`
  width: 98px;
`

export const Banner = styled.div`
background: #7986CB;
display:flex;
/* align-items:center; */
color: #fff;
border-radius:8px;
padding:8px;`

export const Spacer = styled.div`
  flex: 1;
`

export const HR = styled.div`
  height: 1px;
  background-color: #eee;
  width: 100%;
  margin-top: 8px;
  margin-bottom: 8px;
`

export const OTPDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const AppTitle = styled.div`
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

export const MainName = styled.span`
  font-family: "Muli", sans-serif;
  font-size: 40px;
  font-weight: 900;
  opacity: 0.8;
`

export const UserName = styled.span`
  font-family: "Muli", sans-serif;
  font-size: 32px;
  font-weight: 900;
  opacity: 0.8;
  text-align:center;
  align-self:center;
  justify-self:center;
`

export const SubName = styled.span`
  font-family: "Nunito Sans", sans-serif;
  /* font-size: 22px; */
  color: grey;
  text-align: center;
`

export const ZoneName = styled.span`
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