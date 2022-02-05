import logo from './images/bb.png';
import './App.css';
import Navbar from 'react-bootstrap/NavBar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './accounts'
import Admin from './admin'
import UserAccount from './useraccount'
import Register from './register'
import TeamUpdate from './teamupdate';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
        integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
        crossorigin="anonymous"
      />
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home"><img src={logo} height="30px" width="30px"/> 2022 NCAA Tournament Pool</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/admin">Admin</Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
    <Navbar.Text>
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg> <a href="#login">Login</a>
    </Navbar.Text>
  </Navbar.Collapse>
        </Navbar>
      </header>
      <br/><br/>

    <Router>  
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/useraccount/:id" component={UserAccount} />
        <Route path="/teamupdate/:id" component={TeamUpdate} />
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
