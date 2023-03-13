import React from 'react';
import Navbar from 'react-bootstrap/NavBar'
import Nav from 'react-bootstrap/Nav'
import logo from './images/bb.png';

class AppNavBar extends React.Component {
    fetchPoolState = () => {
        var stateUrl = '/api/pool/state';
        fetch(stateUrl)
        .then(response => response.json())
        .then(data => {
            this.setState({
                tourney_year: data.tourneyYear, 
                tourney_state: data.state
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ 
            userName: nextProps.userName, 
            userId: nextProps.userId, 
            isLoggedIn: nextProps.isLoggedIn,
            isAdmin: nextProps.isAdmin});  
      }
    
    constructor(props){
        super(props);
        this.state = {
            tourney_year: '',
            tourney_state: '',
            userName: this.props.userName,
            userId: this.props.userId,
            isLoggedIn: this.props.isLoggedIn,
            isAdmin: this.props.isAdmin
        };

        props.onUserLogin();
        this.fetchPoolState();
    }

    render(){
        const renderNavText = () => {
            if (this.state.isAdmin) {
                return <a style={{textDecoration: 'none'}} href={'/ncaa/admin'}>&nbsp;{this.state.userName}</a>
            }
            else if (this.state.isLoggedIn) {
                return <a style={{textDecoration: 'none'}} href={'/ncaa/useraccount/' + this.state.userId}>&nbsp;{this.state.userName}</a>
            } else {
                return <a style={{textDecoration: 'none'}} href="/ncaa/login">&nbsp;Login</a>;
            }
        }

        const renderNavLinks = () => {
            if(this.state.isAdmin) {
                return (            
                <Nav className="mr-auto">
                <Nav.Link href="/ncaa/admin">Admin Page</Nav.Link>
                <Nav.Link href={'/ncaa/rules'}>Rules</Nav.Link>
                <Nav.Link onClick={() => this.props.onUserLogout()}>Logout</Nav.Link>
            </Nav>)
            }
            else if(this.state.isLoggedIn) {
                return (            
                <Nav className="mr-auto">
                <Nav.Link href={'/ncaa/useraccount/' + this.state.userId}>User Page</Nav.Link>
                <Nav.Link href={'/ncaa/rules'}>Rules</Nav.Link>
                <Nav.Link onClick={() => this.props.onUserLogout()}>Logout</Nav.Link>
            </Nav>)
            } else {
                return(            
                <Nav className="mr-auto">
                    <Nav.Link href={'/ncaa/rules'}>Rules</Nav.Link>
                </Nav>)
            }
        }

        return(
        <Navbar className="color-nav" variant="dark" expand="lg">
            <Navbar.Brand href="/ncaa">
                <img src={logo} height="20px" width="20px"/> 
                &nbsp;<span style={{fontSize:17}}>{this.state.tourney_year} NCAA Tournament Pool</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
                {renderNavLinks()}
                <Navbar.Text>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                </svg> 
                {renderNavText()}
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
        )
    }
}

export default AppNavBar;