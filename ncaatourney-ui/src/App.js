import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login'
import Admin from './Admin';
import UserAccount from './UserAccount'
import Register from './Register'
import TeamUpdate from './TeamUpdate';
import Tourney from './Tourney';
import AppNavBar from './Appnavbar';
import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.userLogin = this.userLogin.bind(this);
    this.userLogout = this.userLogout.bind(this);

    this.state = {
      userName: '',
      userId: '',
      isLoggedIn: false,
      isAdmin: false
    };

    this.userLogin();
  }

  render() {
  return (
    <div className="App">
      <header>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
        integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
        crossorigin="anonymous"
      />
      <AppNavBar userName={this.state.userName} 
        userId={this.state.userId} 
        isLoggedIn={this.state.isLoggedIn} 
        isAdmin={this.state.isAdmin} 
        onUserLogin={this.userLogin}
        onUserLogout={this.userLogout}/>
      </header>
      <br/><br/>

    <Router basename='/ncaa'>  
      <Switch>
        <Route path="/login">
          <Login onUserLogin={this.userLogin}/>
        </Route>
        <Route path="/register">
          <Register onUserLogin={this.userLogin}/>
        </Route>
        <Route path="/admin">
          <Admin onUserLogin={this.userLogin}/>
        </Route>
        <Route path="/tourney">
          <Tourney />
        </Route>
        <Route path="/useraccount/:id" component={UserAccount} />
        <Route path="/teamupdate/:id" component={TeamUpdate} />
        <Route path="/">
          <Login onUserLogin={this.userLogin}/>
        </Route>
      </Switch>
    </Router>
    </div>
  );
  }

  userLogin() {
    const user = localStorage.getItem("ncaauser");
    if(user != null) {
      try {
        let userJson = JSON.parse(user);
        let fullName = userJson.firstName + " " + userJson.lastName;
        let isUserAdmin = userJson.admin;
        this.setState({userName: fullName, 
          userId: userJson.id, 
          isLoggedIn: true, 
          isAdmin: isUserAdmin});
      } catch (error) {
        localStorage.removeItem("ncaauser");
        this.setState({userName: '', 
          userId: '', 
          isLoggedIn: false, 
          isAdmin: false});
      }
    }
  }
  
  userLogout() {
    localStorage.removeItem("ncaauser");
    this.setState({userName: '', userId: '', isLoggedIn: false, isAdmin: false});
    window.location.href = '/ncaa'
  }
}

export default App;
