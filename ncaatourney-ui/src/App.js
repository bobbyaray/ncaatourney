import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './accounts'
import Admin from './admin'
import UserAccount from './useraccount'
import Register from './register'
import TeamUpdate from './teamupdate';
import Tourney from './tourney';
import AppNavBar from './appnavbar';
import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.userLogin = this.userLogin.bind(this);
    this.userLogout = this.userLogout.bind(this);

    this.state = {
      userName: '',
      userId: '',
      isLoggedIn: false
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
        onUserLogin={this.userLogin}
        onUserLogout={this.userLogout}/>
      </header>
      <br/><br/>

    <Router>  
      <Switch>
        <Route path="/login">
          <Login onUserLogin={this.userLogin}/>
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/admin">
          <Admin />
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
      let userJson = JSON.parse(user);
      let fullName = userJson.firstName + " " + userJson.lastName;
      this.setState({userName: fullName, userId: userJson.id, isLoggedIn: true});
    }
  }
  
  userLogout() {
    localStorage.removeItem("ncaauser");
    this.setState({userName: '', userId: '', isLoggedIn: false});
    window.location.href = '/'
  }
}

export default App;
