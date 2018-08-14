import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
import Login from "./screens/Login";
import Logout from "./screens/Logout";
import Home from "./screens/Home";
import Onboard1 from "./screens/Onboard1";
import Onboard2 from "./screens/Onboard2";
import { auth } from "./util/base"
import Loader from './comps/Loading';
import ViewProfile from './screens/ViewProfile';
import EditWork from './screens/EditWork';

// Authorization HOC (Higher-Order components)
const Authorization = (WrappedComponent, user) => {
  return class WithAuthorization extends React.Component {
    render() {
      if (user.uid) {
        console.log("user exists we stick to this path")
        return <WrappedComponent {...this.props} user={user} />
      } else {
        console.log("redirecting")
        return <Redirect to="/"/>
      }
    }
  }
}

const LoggedInHOC = (WrappedComponent, user) => {
  return class WithAuthorization extends React.Component {
    render() {
      if (user.uid) {
        console.log("redirecting to home")
        return <Redirect to="/home"/>
      } else {
        console.log("user not there we continue to login")
        return <WrappedComponent {...this.props}/>
      }
    }
  }
}

class App extends Component {

  state = {
    user: {},
    loggedIn: false,
    loading: true
  }

  async componentDidMount(){
    await auth().onAuthStateChanged( async user => {
      if (user) {
        console.log("User in da house", user)
        await this.setState({
          loggedIn: true,
          user: user,
          loading: false
        })
      } else {
        console.log("no user maan")
        this.setState({loading: false, user: {}})
      }
    })
  }

  render() {
    const user = this.state.user

    if (this.state.loading) {
      return(<Loader/>)
    }

    return (
      <div>
      <Route exact path="/" component={LoggedInHOC(Login, user)} />
      <Route exact path="/home" component={Authorization(Home, user)} />
      <Route exact path="/logout" component={Authorization(Logout, user)} />
      <Route exact path="/onboard1" component={Authorization(Onboard1, user)} />
      <Route exact path="/onboard2" component={Authorization(Onboard2, user)} />
      <Route exact path="/viewprofile" component={Authorization(ViewProfile, user)} />
      <Route exact path="/editwork" component={Authorization(EditWork, user)} />
      </div>
    );
  }
}

export default App;
